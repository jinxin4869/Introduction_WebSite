// ===== DOM ELEMENTS（DOM要素の取得） =====
// HTMLから必要な要素を取得し、変数に格納
const navToggle = document.getElementById('nav-toggle');     // ハンバーガーメニューボタン
const navMenu = document.getElementById('nav-menu');         // ナビゲーションメニュー
const navLinks = document.querySelectorAll('.nav__link');    // すべてのナビゲーションリンク
const scrollTopBtn = document.getElementById('scroll-top');  // スクロールトップボタン
const contactForm = document.getElementById('contact-form'); // お問い合わせフォーム
const sections = document.querySelectorAll('section[id]');   // ID付きのセクション要素

// 「視差効果を減らす」設定。オンなら演出系（タイピング・フェードイン）を行わない
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 連絡先（フォームの送信先）
const CONTACT_EMAIL = 'jinxin10244869@gmail.com';

// ===== MOBILE NAVIGATION（モバイルナビゲーション） =====
// ハンバーガーメニューの開閉機能
function toggleMobileNav() {
    navMenu.classList.toggle('show');           // メニューの表示/非表示切り替え
    navToggle.classList.toggle('active');       // ハンバーガーアイコンのアニメーション
    // メニューが開いている間はページスクロールを無効化
    document.body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : 'auto';
}

// モバイルナビゲーションを閉じる
function closeMobileNav() {
    navMenu.classList.remove('show');           // メニューを非表示
    navToggle.classList.remove('active');       // ハンバーガーアイコンを元に戻す
    document.body.style.overflow = 'auto';      // ページスクロールを再有効化
}

// ===== SMOOTH SCROLLING（スムーススクロール） =====
// ナビゲーションリンククリック時の滑らかなスクロール機能
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId); // ターゲット要素を取得
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight; // ヘッダー高さを取得
        const targetPosition = targetElement.offsetTop - headerHeight;       // スクロール位置計算

        window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    }
}

// ===== SCROLL TO TOP BUTTON（トップに戻るボタン） =====
// スクロール位置に応じてボタンの表示/非表示を制御
function toggleScrollTopButton() {
    scrollTopBtn.classList.toggle('show', window.scrollY > 300); // 300px以上スクロールで表示
}

// ページトップに滑らかにスクロール
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

// ===== ACTIVE NAVIGATION LINK（アクティブナビゲーション） =====
// 現在表示中のセクションに対応するナビゲーションリンクをハイライト
function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100; // スクロール位置（少しオフセット）

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // 現在のスクロール位置がセクション内にある場合、対応するリンクだけを active に
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                const isCurrent = link.getAttribute('href') === `#${sectionId}`;
                link.classList.toggle('active', isCurrent);
                if (isCurrent) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }
    });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS（交差監視によるアニメーション） =====
// 要素が画面に入ったときにフェードインアニメーションを実行
function createObserver() {
    if (prefersReducedMotion) return; // 動きを減らす設定では最初から表示したまま

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // 一度表示したら監視をやめる
            }
        });
    }, {
        threshold: 0.1,                    // 要素の10%が見えたらトリガー
        rootMargin: '0px 0px -50px 0px'    // 下マージンで早めに発動
    });

    // アニメーション対象要素を選択し、初期状態を設定して監視開始
    document.querySelectorAll('.stat, .timeline__item, .experience__item, .contact__detail').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// ===== CONTACT FORM HANDLING（お問い合わせフォーム処理） =====
// 静的サイト（GitHub Pages）のためサーバー送信はしない。
// 入力内容を差し込んだメール作成画面（mailto:）を開き、実際の送信は閲覧者のメールアプリで行う。
// 必須・メール形式のチェックはHTMLの required / type="email" に任せる。
function handleContactForm(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const subject = formData.get('subject');
    const body = `${formData.get('message')}\n\n--\n${formData.get('name')}\n${formData.get('email')}`;

    window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ===== HEADER SCROLL EFFECT（ヘッダースクロール効果） =====
// スクロール時にヘッダーへ影を付ける（見た目はCSSの .header.scrolled 側）
function handleHeaderScroll() {
    document.querySelector('.header').classList.toggle('scrolled', window.scrollY > 50);
}

// ===== TYPING ANIMATION（タイピングアニメーション） =====
// ヒーローセクションの名前部分にタイプライター効果を追加
function initTypingAnimation() {
    const typingElement = document.querySelector('.hero__name');
    if (!typingElement || prefersReducedMotion) return;

    // 打ち込み中も見出し全体が正しく読み上げられるよう、完成形の文言を固定しておく
    const title = typingElement.closest('h1');
    title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());

    const text = typingElement.textContent;  // 元のテキストを取得
    typingElement.textContent = '';
    typingElement.classList.add('is-typing'); // カーソル表示（CSS）

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i); // 1文字ずつ追加
            i++;
            setTimeout(typeWriter, 100); // 100ms間隔で次の文字
        } else {
            // タイピング完了後、カーソルを削除
            setTimeout(() => typingElement.classList.remove('is-typing'), 1000);
        }
    };

    // 少し間を置いてから開始（名前が空の時間を短くするため 400ms）
    setTimeout(typeWriter, 400);
}

// ===== EVENT LISTENERS（イベントリスナーの設定） =====
// DOM読み込み完了後に実行される初期化処理
document.addEventListener('DOMContentLoaded', () => {
    createObserver();        // 交差監視オブザーバー初期化
    initTypingAnimation();   // タイピングアニメーション初期化

    // フッターの著作権表示年を自動更新
    const footerYear = document.getElementById('footer-year');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // ===== ナビゲーション関連イベント =====
    navToggle.addEventListener('click', toggleMobileNav);

    // ページ内リンク（ナビ・ヒーローのボタン）はヘッダー分をずらしてスクロール
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll(link.getAttribute('href'));
            closeMobileNav();
        });
    });

    // ===== スクロール関連イベント =====
    window.addEventListener('scroll', () => {
        toggleScrollTopButton();  // スクロールトップボタンの表示制御
        updateActiveNavLink();    // アクティブナビゲーションリンクの更新
        handleHeaderScroll();     // ヘッダーの見た目変更
    }, { passive: true });

    scrollTopBtn.addEventListener('click', scrollToTop);
    contactForm.addEventListener('submit', handleContactForm);

    // Escキー押下でモバイルメニューを閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
        }
    });

    // デスクトップサイズになったらモバイルメニューを自動で閉じる
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
});

// ===== CONSOLE MESSAGE（コンソールメッセージ） =====
// 開発者向けの情報表示
console.log(`
🎨 ポートフォリオサイト by 陳 錦鑫 (Jinxin Chen)
📧 お問い合わせ: ${CONTACT_EMAIL}
🚀 Built with HTML, CSS, and JavaScript

Thanks for visiting!
`);
