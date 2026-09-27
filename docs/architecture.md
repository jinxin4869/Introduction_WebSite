# Architecture

## 概要

ビルド工程のない静的サイト。GitHub Pages がリポジトリのファイルをそのまま配信する。

```
ブラウザ
 ├─ index.html ─────────── 全コンテンツ（1ページ・5セクション）
 ├─ css/style.css ──────── デザイントークン（:root）＋全スタイル
 ├─ js/script.js ───────── 通常スクリプト：ナビ・スクロール・フォーム・演出
 ├─ js/ink-background.js ─ ESモジュール：ヒーローの水墨インク（WebGL）
 │     └─ three@0.160.0 ── import map 経由で jsDelivr CDN から読み込む
 ├─ Google Fonts ───────── Noto Sans JP（本文）／ Yuji Syuku（見出し）
 └─ assets/images/ ─────── パンダ.png（アバター）、GitHub アイコン
```

## ファイルの責務

| ファイル | 責務 |
|---|---|
| `index.html` | 内容の唯一の置き場所。文言・経歴を変えるときはここだけを編集する |
| `css/style.css` | `:root` のカスタムプロパティが色・文字サイズ・余白・角丸の唯一の情報源。BEM 命名 |
| `js/script.js` | DOM 操作。モバイルナビ開閉、スムーススクロール、アクティブリンク、フェードイン（IntersectionObserver）、フォームの検証と模擬送信、通知、タイピング演出、フッターの年表示 |
| `js/ink-background.js` | three.js で全画面クアッドを描き、フラグメントシェーダーで墨のにじみを表現する |

## 水墨インク背景（`ink-background.js`）

- **起動条件**：`prefers-reduced-motion`、タッチ主体（`pointer: coarse`）、768px 未満、Save-Data、`deviceMemory <= 2` のどれかに当てはまる場合は起動しない。WebGL の初期化に失敗した場合も静かに諦める。
- **フォールバック**：`.hero__ink-fallback`（CSS と SVG の静止インク）が常に下に敷かれている。起動に成功すると `.hero.ink-live` が付き、静止インクがフェードアウトする。
- **色**：CSS 変数 `--bg-primary`／`--text-primary`／`--primary-color` を実行時に読み込む。トークンを変えれば背景の色も追従する。
- **負荷対策**：DPR の上限 1.5、描画は 30fps、ヒーローが画面外またはタブが非表示のときはループを止める。墨だまりは最大16個のリングバッファ。
- **描画方式**：流体シミュレーションではなく、単一パスでの近似（墨だまりの半径を時間で広げ、FBM ノイズとドメインワーピングで縁をにじませる）。

## イベントの流れ（`script.js`）

- `DOMContentLoaded` でフェードイン監視、タイピング演出、各リスナーを登録する。
- `scroll`（間引きなし）：トップへ戻るボタン、アクティブリンク、`animateSkillBars`、ヘッダーの影を毎回更新する。
- ナビリンクは `preventDefault` したうえで、ヘッダーの高さを差し引いた位置へ `scrollTo` する。

## 既知の技術的負債

| 箇所 | 内容 | 対応案 |
|---|---|---|
| `style.css` レスポンシブ | 768px 以下で `.nav__menu` を隠す指定も `.nav__toggle` を表示する指定もなく、`.nav__menu.show` の定義もない。各グリッドも1カラムに落ちない | モバイル用のメディアクエリを追加する |
| `script.js` | `animateSkillBars`／`.skill-bar__fill`（スキルバーは廃止済み）、`requestTick`／`debounce`／`throttle`（未使用）、`trackEvent`（console.log のみ）が残っている | 削除する |
| `script.js` | `using-keyboard` クラスを付けているが、対応する CSS がない | 削除し、CSS の `:focus-visible` に任せる |
| `script.js` フォーム | `setTimeout` で送信を模擬している | PRD U-1 の決定に従う |
| `script.js` 通知 | スタイルを JS の `style.cssText` に直書きしており、色が水墨パレット外（#4caf50 など） | CSS クラスに移し、トークンを使う |
| `index.html` | `<a alt="...">`（無効な属性）、ハンバーガーが `<div>`、トップへ戻るボタンにラベルがない | `<button aria-label>` にする |
| `README.md`／`FILE_STRUCTURE.md` | FILE_STRUCTURE.md が旧デザイン（コーラル配色）のまま | 本書に統合するか更新する |

## デプロイ

`main` ブランチを GitHub Pages で公開する。相対パスで参照しているため、サブパス（`/<repo>/`）配信でも動く。ローカルでは `python3 -m http.server 8000` で確認できる（ES モジュールと import map は `file://` だと動かない場合がある）。
