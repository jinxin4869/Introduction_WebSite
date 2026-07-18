# Introduction_WebSite

陳 錦鑫（Jinxin Chen）のポートフォリオサイト。Webエンジニアとしての経歴・スキル・プロジェクトを紹介する自己紹介サイトです。

## デザインコンセプト

**中国の水墨画** をモチーフにした、余白と一筆の勢いを活かしたデザイン。

- 配色は **墨（`#1c1f22`）・和紙（`#f5f1e6`）・朱（`#b3402c`、落款の朱色）** の3色を基調
- 見出しは筆致のある明朝系フォント **Yuji Syuku**、本文は **Noto Sans JP**
- 背景に和紙の質感を出す淡いノイズテクスチャ（SVGフィルター）を敷いています

> もともとはコーラルオレンジ系の暖色デザインでしたが、水墨画テイストへリニューアルしました。

## 技術構成

外部フレームワーク・ビルドツールに依存しない、**HTML / CSS / Vanilla JavaScript のみ** の構成です。

| 種別 | 使用技術 |
|------|----------|
| マークアップ | HTML5（セマンティック要素、SEO・アクセシビリティ配慮） |
| スタイル | CSS3（カスタムプロパティ、Flexbox / Grid、アニメーション、BEM命名） |
| スクリプト | Vanilla JavaScript（ES6+、DOM操作、IntersectionObserver） |
| フォント | Google Fonts（Noto Sans JP / Yuji Syuku） |

## ディレクトリ構成

```
Introduction_WebSite/
├── index.html            # メインHTML
├── css/
│   └── style.css         # スタイルシート（カラートークン・レイアウト・アニメーション）
├── js/
│   └── script.js         # ナビ制御・スムーススクロール・フォーム処理など
├── assets/
│   └── images/           # プロフィール画像・アイコン
├── README.md
└── FILE_STRUCTURE.md     # ファイル構成の詳細
```

## セクション構成

- **ホーム（Hero）** — 自己紹介、タイピングアニメーション
- **自己紹介（About）** — プロフィール、統計情報カード
- **スキル（Skills）** — プログラミング歴タイムライン、技術スタックのタグ表示
- **経歴（Experience）** — 職歴・学歴
- **お問い合わせ（Contact）** — バリデーション付きフォーム

## ローカルでの確認方法

ビルド不要なので、以下のいずれかで確認できます。

**1. VSCode の Live Server 拡張（推奨）**
`index.html` を右クリック →「Open with Live Server」。保存時に自動リロードされます。

**2. 簡易HTTPサーバーを立てる**

```bash
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

**3. ファイルを直接開く**
`index.html` をブラウザにドラッグ＆ドロップ（サーバー経由の方が公開環境に近い挙動になります）。

## 今後の予定

- [ ] three.js 導入による水墨インク背景（「流動」）の実装 — [#5](https://github.com/jinxin4869/Introduction_WebSite/issues/5)
- [ ] 経歴セクションへの巻物風スクロール演出（「山水」）
- [ ] レスポンシブ・アクセシビリティのさらなる作り込み
