---
name: Jinxin Chen Portfolio
description: 墨・和紙・朱の三色で描く、水墨画モチーフの自己紹介サイト
colors:
  vermilion-seal: "#b3402c"
  vermilion-wash: "#c96a52"
  vermilion-deep: "#8a2f1f"
  stone: "#6b7680"
  stone-deep: "#55606b"
  sumi-ink: "#1c1f22"
  diluted-ink: "#4b5157"
  ash: "#7c8288"
  washi: "#f5f1e6"
  aged-paper: "#ece4d1"
  pale-paper: "#efe9da"
  paper-white: "#faf7f0"
typography:
  display:
    fontFamily: "'Yuji Syuku', 'Noto Serif JP', serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.02em"
  headline:
    fontFamily: "'Yuji Syuku', 'Noto Serif JP', serif"
    fontSize: "1.875rem"
    fontWeight: 400
    letterSpacing: "0.02em"
  title:
    fontFamily: "'Yuji Syuku', 'Noto Serif JP', serif"
    fontSize: "1.5rem"
    fontWeight: 400
    letterSpacing: "0.02em"
  body:
    fontFamily: "'Noto Sans JP', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "'Noto Sans JP', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "'Noto Sans JP', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
rounded:
  sm: "2px"
  md: "3px"
  lg: "4px"
  full: "50%"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.vermilion-seal}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.lg}"
    padding: "12px 32px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.vermilion-seal}"
    rounded: "{rounded.lg}"
    padding: "12px 32px"
  skill-tag-core:
    backgroundColor: "{colors.aged-paper}"
    textColor: "{colors.sumi-ink}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  skill-tag-framework:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.vermilion-seal}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  skill-tag-tool:
    backgroundColor: "{colors.pale-paper}"
    textColor: "{colors.sumi-ink}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
  input:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.sumi-ink}"
    rounded: "{rounded.md}"
    padding: "24px"
---

# Design System: Jinxin Chen Portfolio

> トークンの実体は `css/style.css` の `:root`。この文書と食い違ったら CSS が正で、この文書を直す。

## Overview

**Creative North Star: "余白に一筆" (One Stroke on Open Paper)**

和紙の地に、墨で一筆だけ置き、最後に朱の落款を押す。水墨画の手順をそのまま画面の設計に移している。広い余白がページの大半を占め、墨（本文・見出し）が構造を作り、朱は「押印」として要所に少しだけ現れる。ヒーローだけは例外で、WebGL の墨がにじむ一枚絵として主役を張る。ほかのセクションは静止した筆ストローク、隅のにじみ、落款で世界観をつなぐ。

密度は低め。1セクションに1つの主題を置き、2カラムで「語り（テキスト）」と「証拠（カード・タグ・年表）」を並べる。

**Key Characteristics:**
- 墨・和紙・朱の三色構成。純白・純黒は使わない
- 見出しは筆文字（Yuji Syuku）、本文はゴシック（Noto Sans JP）
- 角丸は最大 4px。円はアバターと落款まわりに限る
- 装飾はすべて CSS/SVG で、ヒーロー以外は負荷ゼロ
- 和紙の繊維を思わせる、ごく淡いノイズテクスチャを全面に敷く

## Colors

墨の濃淡と紙の色味で面を作り、朱を一点のアクセントに使うパレット。

### Primary
- **Vermilion Seal（落款の朱）**：主ボタン、名前、日付、年表の点、ロゴ、落款。「押印」の役割で、画面に占める面積は小さく保つ。
- **Vermilion Wash（淡い朱）**：年表の縦線。
- **Vermilion Deep（深い朱）**：朱の要素のホバー。

### Secondary
- **Stone / Stone Deep（石色）**：ツール系スキルタグの枠線と、そのホバー時の背景。

### Neutral
- **Sumi Ink（墨）**：本文、見出し、フッターの背景。
- **Diluted Ink（淡墨）**：補足文、サブタイトル、経歴の詳細。
- **Ash（石灰）**：和紙の上ではコントラスト 3.4:1 で AA に届かないため、本文には使わない。
- **Washi（和紙）**：ページの地。
- **Aged Paper（古紙）**：スキルセクションの地、カード、コアタグ。
- **Pale Paper（淡い古紙）**：お問い合わせセクションの地。
- **Paper White（紙白）**：自己紹介・経歴セクションの地、フォームの面、朱の上の文字。

### Named Rules
**The Small Seal Rule.** 小さい朱の文字（日付・期間・リンク）は深い朱（Vermilion Deep）で書く。通常の朱は古紙の上でコントラストがぎりぎり（4.5:1）になる。

**The Seal Rule.** 朱は印章である。1つのビューで朱が占める面積は約10%以下に抑え、面を朱で塗りつぶすのは主ボタンと落款だけにする。

**The No Pure Rule.** `#fff` と `#000` は使わない。白は紙白、黒は墨を使う。フォームの入力欄も和紙色で塗る。

## Typography

**Display Font:** Yuji Syuku（フォールバック：Noto Serif JP, serif）
**Body Font:** Noto Sans JP（ウェイト 300/400/500/700 を読み込み）

**Character:** 筆の抑揚を持つ見出しと、癖のないゴシックの本文。見出しで情緒を、本文で読みやすさを担う。

### Hierarchy
- **Display**（400, 3rem → 480px 以下で 2rem, 1.2）：ヒーローの「私は陳 錦鑫です」のみ。
- **Headline**（400, 1.875rem）：セクションタイトル。下に筆の一線、上に長い墨線が付く。
- **Title**（400, 1.5rem）：セクション内の小見出し（プロフィール、職歴など）。
- **Body Lead**（400, 1.125rem, 1.8）：導入文、プロフィール文。
- **Body**（400, 1rem, 1.6）：一般の本文。
- **Label**（600, 0.875rem）：日付、期間。朱で表示する。

### Named Rules
**The Single Weight Rule.** Yuji Syuku はウェイト 400 しかない。見出しに 600/700 を指定するとブラウザが疑似的に太らせ、筆致がにじんで潰れる。見出しは常に 400 で、強さはサイズと余白で出す。

## Layout

- コンテナの最大幅は 1200px、左右パディングは 16px。
- セクションは上下 96px の余白。セクションヘッダーは中央揃えで、下に 96px 空ける。
- 各セクション本文は2カラムのグリッド（ヒーロー 1:1、自己紹介 2:1、ほかは 1:1）で、間隔は 96px。
- 地の色をセクションごとに交互に替える（和紙 → 紙白 → 古紙 → 紙白 → 淡い古紙）ことで、罫線なしに区切る。
- ブレークポイントは 768px と 480px。768px 以下は全セクションを1カラムにし、ハンバーガーメニューに切り替える（`feature/responsive` ブランチで対応）。

## Elevation & Depth

基本は和紙を重ねるような平面の構成で、奥行きは地色の差で出す。影は墨色ベースのごく淡いものに限り、カード（`0 4px 20px` 6%）、フォーム（`0 10px 30px` 12%）、アバターの円（`0 20px 40px` 12%）で使う。ホバーでは `translateY(-2px〜-5px)` と影を強める。

### Named Rules
**The Paper Stack Rule.** 奥行きはまず地色の段差で表す。影は「紙が1枚浮いている」程度にとどめ、12% を超えない。

## Shapes

ほぼ直角（2〜4px）。筆と紙の世界に丸いピル形は合わない。円はアバター（円相をイメージした輪郭）、年表の点、トップへ戻るボタン、連絡先アイコンの台座だけに使う。落款は角丸 5px の正方形を約 −4° 傾け、SVG の turbulence フィルターで縁を荒らして手押しの印に見せる。

## Components

### Buttons
- **Shape:** ほぼ直角（4px）
- **Primary:** 朱の地に紙白の文字、パディング 12px 32px、淡い影。ホバーで 2px 浮き、影が濃くなる。
- **Secondary:** 透明の地に朱の 2px 枠と朱の文字。ホバーで朱に塗りつぶされる。

### Chips（スキルタグ）
- **Core（言語）:** 古紙の地、墨の文字、墨15% の枠。
- **Framework:** 紙白の地、朱の文字と枠。ホバーで反転する。
- **Tool:** 淡い古紙の地、石色の枠。ホバーで石色に塗りつぶされる。
- タグは操作できないので、ホバーで動かさない。

### Cards / Containers
- **Corner Style:** 4px
- **Background:** 古紙（統計カード、経歴カード）、紙白（連絡先、フォーム）
- **Border:** なし。片側だけの太い色線（サイドタブ）は使わない。
- **Internal Padding:** 24〜32px

### Inputs / Fields
- **Style:** 和紙色の地、古紙色の 2px 枠、角丸 3px、パディング 24px
- **Focus:** 枠が朱に変わる（アウトラインは消している）

### Navigation
- 固定ヘッダー。95% 不透明の和紙色の地にぼかしをかけ、下に墨8% の罫線を引く。スクロールすると影が付く。
- リンクは墨の文字で、ホバーで朱の文字と古紙の地に変わる。現在地のリンクは、深い朱の文字と朱の 2px 下線（offset 6px）で示す。
- ロゴ「Jinxin Chen」は Yuji Syuku の朱。

### 落款（Seal）— signature
各セクションの右上に置く、52px（モバイルでは 40px）の朱印。「陳」の一字を紙白で抜き、−4° 傾ける。セクションごとに turbulence の seed を変え、1つずつ押し跡が違うように見せる。

### 墨のにじみ（Ink Bloom）— signature
- **ヒーロー:** WebGL のライブインク（architecture.md を参照）と、その静止フォールバック。
- **ほかのセクション:** 隅に 380px・不透明度 5% の静止のにじみを置く。四隅を交互に使う。

## Do's and Don'ts

### Do:
- **Do** 朱を「押印」として扱い、1つのビューで一点か二点に絞る（The Seal Rule）。
- **Do** 見出しの Yuji Syuku は常にウェイト 400 で使う（The Single Weight Rule）。
- **Do** 新しい色は `:root` のトークンとして追加し、JS（WebGL を含む）からも CSS 変数を読む。
- **Do** 重い演出には、静止画で同じ印象を与えるフォールバックを必ず用意する。

### Don't:
- **Don't** 純白・純黒や、パレット外の彩色（緑・青の通知色など）を使わない。
- **Don't** 角丸 4px を超えるピル形・カプセル形を使わない。
- **Don't** クリックできない要素（統計カード、経歴カード、タグ）をホバーで動かさない。
- **Don't** 絵文字をアイコン代わりにしない（水墨の世界観と質感が合わない）。
