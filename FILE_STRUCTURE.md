# 📁 ポートフォリオサイト ファイル構成

## 🏗️ プロジェクト概要
HTML、CSS、JavaScriptのみで構築されたレスポンシブ対応のポートフォリオサイト

## 📂 ディレクトリ構造

```
Introduction_WebSite/
│
├── 📄 index.html                    # メインHTMLファイル
├── 📄 README.md                     # プロジェクト説明書
│
├── 📁 css/
│   └── 📄 style.css                 # メインスタイルシート
│
├── 📁 js/
│   └── 📄 script.js                 # メインJavaScriptファイル
│
└── 📁 assets/
    └── 📁 images/                   # 画像ファイル用ディレクトリ
        └── (画像ファイルを配置)
```

## 📋 ファイル詳細

### 🔧 **コアファイル**

| ファイル名 | 役割 | 説明 |
|-----------|------|------|
| `index.html` | メインページ | セマンティックHTML、SEO最適化、アクセシビリティ対応 |
| `css/style.css` | スタイルシート | CSS変数、レスポンシブデザイン、アニメーション |
| `js/script.js` | JavaScript | インタラクティブ機能、フォーム処理、アニメーション制御 |

### 📖 **ドキュメント**

| ファイル名 | 役割 | 説明 |
|-----------|------|------|
| `README.md` | プロジェクト説明 | 概要、使用方法、技術仕様 |
| `FILE_STRUCTURE.md` | 構成説明 | ファイル・ディレクトリの詳細説明 |

### 🎨 **アセット**

| ディレクトリ | 役割 | 説明 |
|-------------|------|------|
| `assets/images/` | 画像格納 | プロフィール画像、アイコン、装飾画像用 |

## 🎯 各ファイルの機能

### 📄 **index.html**
```html
<!-- 主要セクション -->
- ヘッダー（ナビゲーション）
- ヒーロー（自己紹介）
- About（詳細プロフィール）
- Skills（プログラミング歴・技術）
- Experience（職歴・学歴）
- Contact（お問い合わせフォーム）
- フッター
```

**特徴:**
- セマンティックHTML5タグ使用
- アクセシビリティ対応（aria-label、alt等）
- SEO最適化（meta tags、構造化）
- 外部フォント読み込み（Noto Sans JP）

### 🎨 **css/style.css**
```css
/* 主要セクション */
- CSS Reset & Base          /* リセット・基本設定 */
- CSS Variables            /* カラー・サイズ変数 */
- Utility Classes          /* 汎用クラス */
- Header                   /* ナビゲーション */
- Hero Section            /* ヒーローエリア */
- About Section           /* 自己紹介 */
- Skills Section          /* スキル・経歴 */
- Experience Section      /* 職歴・学歴 */
- Contact Section         /* お問い合わせ */
- Footer                  /* フッター */
- Scroll to Top           /* トップ戻りボタン */
- Responsive Design       /* レスポンシブ対応 */
```

**特徴:**
- CSS変数による一元的な色・サイズ管理
- モバイルファーストなレスポンシブデザイン
- Flexbox・CSS Gridによるモダンレイアウト
- CSS Keyframesアニメーション
- BEM命名規則準拠

### ⚡ **js/script.js**
```javascript
/* 主要機能 */
- DOM Elements            /* DOM要素取得 */
- Mobile Navigation       /* モバイルナビ制御 */
- Smooth Scrolling        /* スムーススクロール */
- Scroll to Top          /* トップ戻り機能 */
- Active Navigation      /* アクティブリンク */
- Skill Bars Animation   /* スキルバーアニメ */
- Intersection Observer  /* 要素表示監視 */
- Contact Form Handling  /* フォーム処理 */
- Email Validation       /* メール検証 */
- Notification System    /* 通知システム */
- Header Scroll Effect   /* ヘッダー効果 */
- Typing Animation       /* タイピング効果 */
- Event Listeners        /* イベント管理 */
- Accessibility          /* アクセシビリティ */
- Analytics & Tracking   /* 分析・追跡 */
```

**特徴:**
- モジュール化された関数設計
- パフォーマンス最適化（デバウンス・スロットル）
- アクセシビリティ対応
- エラーハンドリング
- 詳細コメント付き

## 🔧 技術仕様

### **使用技術**
- **HTML5**: セマンティック要素、フォーム
- **CSS3**: Flexbox、Grid、Variables、Animations
- **Vanilla JavaScript**: ES6+、DOM操作、イベント処理

### **外部依存**
- **Google Fonts**: Noto Sans JP
- **アイコン**: 絵文字（📧、📍、⏰等）

### **ブラウザ対応**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📱 レスポンシブブレークポイント

| デバイス | 画面幅 | レイアウト |
|----------|--------|-----------|
| モバイル | ~480px | 1カラム、最小UI |
| タブレット | 481px~768px | 1カラム、調整済み |
| デスクトップ | 769px+ | 2カラム、フル機能 |

## 🎯 カスタマイズ方法

### **色の変更**
`css/style.css` の CSS変数を編集:
```css
:root {
    --primary-color: #ff8a65;    /* メインカラー */
    --secondary-color: #ffcc80;  /* セカンダリカラー */
    /* その他の色設定... */
}
```

### **コンテンツの変更**
`index.html` の各セクション内のテキストを編集

### **機能の追加**
`js/script.js` に新しい関数を追加し、イベントリスナーで連携

## 📈 今後の拡張予定

- [ ] 画像ファイルの追加
- [ ] 多言語対応
- [ ] ダークモード
- [ ] パフォーマンス最適化
- [ ] PWA対応
- [ ] CMS連携

## 📞 サポート

技術的な質問やカスタマイズ依頼は、お問い合わせフォームからご連絡ください。
