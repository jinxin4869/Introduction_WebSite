// ===== 水墨インク背景（three.js / WebGL）=====
// Issue #5 フェーズ1〜2の最小スパイク。
// ヒーローセクション背面に全画面シェーダーを敷き、マウス位置から墨がにじむように広がる表現を出す。
// 本格的な流体シミュレーション（ping-pongバッファ）ではなく、
// 「最近の墨だまり(drop)を時間で拡散・減衰させる」単一パスの近似。実機で方向性を判断するのが目的。

import * as THREE from 'three';

// ---- 起動可否の判定（フォールバック方針）----------------------------------
// prefers-reduced-motion / タッチ主体・低スペック環境 / 小画面ではWebGLを起動しない。
// 起動しない場合、canvasは opacity:0 のまま。CSSの静止背景がそのまま見える。
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
const isSmallViewport = window.innerWidth < 768;

const canvas = document.getElementById('hero-ink');
const hero = document.getElementById('home');

if (canvas && hero && !prefersReducedMotion && !isCoarsePointer && !isSmallViewport) {
    try {
        initInkBackground(canvas, hero);
    } catch (err) {
        // WebGL非対応やコンテキスト生成失敗時は静かに諦める（静止背景にフォールバック）
        console.warn('[ink-background] WebGL初期化に失敗したため静止背景で表示します:', err);
    }
}

function initInkBackground(canvas, hero) {
    const MAX_DROPS = 16;      // 同時に保持する墨だまりの最大数
    const DROP_LIFETIME = 4.5; // 1滴が消えるまでの秒数

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,          // 全画面シェーダーなのでMSAAは不要（負荷削減）
        powerPreference: 'low-power',
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // 高DPIでの負荷を抑制
    renderer.setPixelRatio(dpr);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1); // 全画面クアッド用

    // 墨だまりの状態: vec4(x, y, birthTime, seed)。birthTime<0 は未使用スロット。
    const drops = [];
    for (let i = 0; i < MAX_DROPS; i++) {
        drops.push(new THREE.Vector4(0, 0, -1, 0));
    }

    const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_drops: { value: drops },
        u_lifetime: { value: DROP_LIFETIME },
        u_paper: { value: new THREE.Color(0xf5f1e6) }, // 和紙色
        u_ink: { value: new THREE.Color(0x1c1f22) },   // 墨色
        u_accent: { value: new THREE.Color(0xb3402c) }, // 朱色（にじみの芯にほのかに）
    };

    const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        vertexShader: /* glsl */ `
            varying vec2 v_uv;
            void main() {
                v_uv = uv;
                gl_Position = vec4(position.xy, 0.0, 1.0);
            }
        `,
        fragmentShader: /* glsl */ `
            precision highp float;

            #define MAX_DROPS ${MAX_DROPS}

            varying vec2 v_uv;

            uniform float u_time;
            uniform vec2  u_resolution;
            uniform vec4  u_drops[MAX_DROPS];
            uniform float u_lifetime;
            uniform vec3  u_paper;
            uniform vec3  u_ink;
            uniform vec3  u_accent;

            // --- 値ノイズ + FBM（にじみの不規則な輪郭を作る）---
            float hash(vec2 p) {
                p = fract(p * vec2(123.34, 456.21));
                p += dot(p, p + 45.32);
                return fract(p.x * p.y);
            }
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                vec2 u = f * f * (3.0 - 2.0 * f);
                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));
                return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
            }
            float fbm(vec2 p) {
                float v = 0.0;
                float amp = 0.5;
                for (int i = 0; i < 5; i++) {
                    v += amp * noise(p);
                    p *= 2.0;
                    amp *= 0.5;
                }
                return v;
            }

            void main() {
                // アスペクト比を補正した座標（にじみが縦横で歪まないように）
                float aspect = u_resolution.x / u_resolution.y;
                vec2 auv = vec2(v_uv.x * aspect, v_uv.y);

                // --- ドメインワーピング ---
                // 座標そのものをノイズでゆがめてから距離を測ることで、
                // 真円ではなく墨が繊維に染み込むような不規則（かすれ・毛羽立ち）な輪郭にする。
                vec2 warp = vec2(
                    fbm(auv * 3.0 + u_time * 0.03),
                    fbm(auv * 3.0 + vec2(7.3, 2.1) - u_time * 0.025)
                ) - 0.5;
                vec2 suv = auv + warp * 0.07;

                // 紙のかすかな地合い
                float paperGrain = fbm(auv * 4.0 + u_time * 0.02);

                // --- 常時ゆっくり漂う墨（アンビエント）---
                // マウスを動かさなくても、墨のもやが流れ続ける（＝いつでも動きが見える）。
                // 左カラムの文字の可読性を守るため、右側（プロフィール画像側）ほど濃く、
                // 左側（テキスト側）は薄く残す横方向マスクをかける。
                float ambField = fbm(suv * 1.4 + vec2(u_time * 0.06, u_time * 0.04));
                float amb = smoothstep(0.40, 0.76, ambField);
                float sideMask = 0.30 + 0.70 * smoothstep(0.28, 0.70, v_uv.x);
                float ambient = amb * 0.30 * sideMask;

                float ink = 0.0;
                float core = 0.0; // にじみの芯（朱を差す量）

                for (int i = 0; i < MAX_DROPS; i++) {
                    vec4 d = u_drops[i];
                    if (d.z < 0.0) continue;             // 未使用スロット
                    float age = u_time - d.z;
                    if (age < 0.0 || age > u_lifetime) continue;

                    // 時間とともに減速しながら広がる半径
                    float radius = sqrt(age) * 0.17;
                    // 寿命に沿ってフェード（イーズアウト）
                    float life = 1.0 - age / u_lifetime;
                    life = life * life;

                    vec2 dp = vec2(d.x * aspect, d.y);
                    // ワープした座標で距離をとる → 縁が繊維状ににじむ
                    float dist = distance(suv, dp);

                    // 細かいノイズで縁をさらに毛羽立たせる（毛細管現象の風合い）
                    float fib = fbm(auv * 9.0 + d.w * 13.0);
                    float edge = radius * (0.6 + 0.6 * fib);

                    float a = smoothstep(edge, edge * 0.3, dist) * life;
                    ink += a;
                    core += smoothstep(edge * 0.45, 0.0, dist) * life;
                }

                // アンビエントと墨だまりを合算
                ink = clamp(ink + ambient, 0.0, 1.0);
                // にじみの縁を紙のかすれで少しだけ削る
                ink *= 0.8 + 0.2 * paperGrain;

                // 紙 → 墨 の混色。芯にほんのり朱を差す。
                vec3 col = mix(u_paper, u_ink, ink);
                col = mix(col, u_accent, clamp(core, 0.0, 1.0) * 0.10);

                // 背景の和紙部分は透過させ、墨がのった所ほど不透明に
                float alpha = ink * 0.92;
                gl_FragColor = vec4(col, alpha);
            }
        `,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    const clock = new THREE.Clock();

    // ---- リサイズ ----------------------------------------------------------
    function resize() {
        const w = hero.clientWidth;
        const h = hero.clientHeight;
        renderer.setSize(w, h, false);
        uniforms.u_resolution.value.set(w * dpr, h * dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    // ---- マウス追従で墨だまりを追加 ---------------------------------------
    let dropCursor = 0;
    let lastEmit = 0;
    let lastPos = null;

    hero.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return; // タッチは対象外（起動判定でも弾いている）
        const now = performance.now();
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height; // WebGLはY上向き

        // 一定間隔・一定移動量でのみ発生（滴を出しすぎない）
        const moved = lastPos ? Math.hypot(x - lastPos.x, y - lastPos.y) : 1;
        if (now - lastEmit < 55 || moved < 0.012) return;
        lastEmit = now;
        lastPos = { x, y };

        const d = drops[dropCursor];
        d.set(x, y, clock.getElapsedTime(), Math.random());
        dropCursor = (dropCursor + 1) % MAX_DROPS;
    });

    // ---- 可視時のみ描画（オフスクリーン・非アクティブタブでは停止）--------
    let isVisible = true;
    const io = new IntersectionObserver(
        (entries) => { isVisible = entries[0].isIntersecting; if (isVisible) tick(); },
        { threshold: 0 }
    );
    io.observe(hero);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && isVisible) tick();
    });

    // ---- 描画ループ --------------------------------------------------------
    let running = false;

    function tick() {
        if (running) return;
        running = true;
        requestAnimationFrame(frame);
    }
    function frame() {
        if (!isVisible || document.visibilityState !== 'visible') {
            running = false; // 見えていない間は回さない
            return;
        }
        uniforms.u_time.value = clock.getElapsedTime();
        renderer.render(scene, camera);
        requestAnimationFrame(frame);
    }

    canvas.classList.add('is-active'); // CSS側でフェードイン
    tick();
}
