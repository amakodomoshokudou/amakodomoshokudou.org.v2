---
name: css-style
description: このプロジェクトの CSS（.astro の scoped <style> と global.css / reset.css）を書く・編集するときの規約。新たにスタイルを当てるとき、クラス名を付けるとき、状態やレスポンシブを書くときに使う。
---

# CSS の書き方の規約

このプロジェクトで CSS を書く（`.astro` ファイルの scoped `<style>`、`src/shared/global.css`、`src/shared/reset.css`）ときは、次を守る。

## レイヤー構成

- `global.css` は CSS 標準のカスケードレイヤー `@layer reset, base, util` で構成する。トークン定義（`:root`）も base レイヤー内に置く
- リセットは `src/shared/reset.css` を `@import "./reset.css" layer(reset)` で読み込む
- トークンは Tailwind 時代からの変数名を維持する（`--spacing-84` = 5.25rem の「数値 / 4 = rem」スケール、`--text-sm`、`--leading-sm` など）
- `prose` と `sr-only` は `global.css` の `@layer util` 内の共通クラスとして定義する。それ以外のスタイルはコンポーネントごとの scoped `<style>` に書き、重複を許容する（新規コンポーネントの切り出しはしない）

## プロパティ

- left / right / top / bottom を使う物理プロパティではなく、`*-inline-start` / `*-inline-end` / `*-block-start` / `*-block-end` の論理プロパティを使う
- ビューポート単位は `svh` ではなく `svb` を使う
- `overflow-block` は Safari 26 未満向けに `overflow-y` のフォールバックを併記する

## クラス名

- `block_element` 形式のクラス名を使う
- 1 つの要素には 1 つのクラス名を書き、その要素のスタイルをすべてそのクラスに集約する
- クラス名はコンポーネント内で別々の役割には重複して使わない。同じ構造の繰り返し要素（ループやコピペで並ぶ行）は同名を共有してよい

## 状態・疑似要素の表現

状態・疑似要素・疑似クラスは、対応するクラスのブロック内に CSS ネスティング（`&`）で表現する。

- 属性セレクタは `&[aria-current="page"]`、`&[aria-current]`、`&[data-open="true"]` の形
- `::-webkit-details-marker` などの疑似要素も `&::-webkit-details-marker { … }` とネストする
- 祖先の状態に連動するもの（`details` の `open` など）は祖先要素のクラス内で `&[open] .icon { … }` とする。`open` 属性は `summary` ではなく `details` に付くことに注意（`summary` 側のクラス内で `&[open]` と書いてもマッチしない）
- ダークモードは `@media (prefers-color-scheme: dark)` 内にネストする

## ネスティングでの `&` の要否

- メディアクエリ・コンテナクエリなど at-rule 内に**宣言を直接書くときは `&` 不要**。`@media (…) { font-size: …; }` のように書く
- at-rule 内に**セレクタを書くときは `&` が必要**（`@media (any-hover: hover) { &:hover { … } }` など）

## hover・focus

- hover は `@media (any-hover: hover)` で囲んで `&:hover` とし、各コンポーネントの scoped `<style>` でその class に明示する
- focus は `global.css` の `@layer base` に global 定義済みのため、コンポーネント側では書かない（暫定で全フォーカス状態に適用する `:focus`。将来的に `:focus-visible` のみへ絞り込む）

## Astro scoped style の仕様

- スコープは `data-astro-cid-*` 属性セレクタで付与される。specificity が属性分の 0,1,0 増える
- slot の中身や子コンポーネントの要素にはスコープの data 属性が付かないため、スタイルが必要な場合は `:global()` を使う
- メディアクエリ・コンテナクエリ内では `var()` が使えないため、ブレークポイントは rem 直書き（sm 40rem / md 48rem / lg 64rem / xl 80rem / 2xl 96rem、`@container` は 22.25rem / 40rem）

## ネストの参考例

実際にコードベースにある例。

`aria-current`（layout.astro / pagination.astro のナビ）:

```css
.nav_link {
  background-color: var(--color-primary-background);

  &[aria-current="page"] {
    background-color: var(--color-secondary-background);
  }
}

.pagination_link {
  &[aria-current] {
    background-color: var(--color-secondary-background);
  }
}
```

`data-open`（copy-button.astro の通知）:

```css
.copy_notify {
  &[data-open="true"] {
    border: 1px solid var(--color-secondary-border);
    padding: var(--spacing-4);
  }
}
```

疑似要素と祖先の状態（area-filter.astro の `::-webkit-details-marker` と `open`）:

```css
.filter_summary {
  &::-webkit-details-marker {
    display: none;
  }
}

.filter_icon {
  /* 祖先の details のクラス内ではなく、icon のクラスから
     親の状態を is() で参照して書くこともできる */
  &:is(details[open] *) {
    rotate: 180deg;
  }
}
```

祖先の `details`（`area_filter`）のクラスから書く場合:

```css
.area_filter {
  /* summary 自身への状態の連動 */
  &[open] .filter_summary {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  /* 子孫への連動 */
  &[open] .filter_icon {
    rotate: 180deg;
  }
}
```

ダークモード（layout.astro のロゴ名）:

```css
.logo_name {
  @media (prefers-color-scheme: dark) {
    filter: invert(1);
  }
}
```

hover（新規に書く場合の例）:

```css
.nav_link {
  @media (any-hover: hover) {
    &:hover {
      background-color: var(--color-tertiary-background);
    }
  }
}
```

レスポンシブとコンテナクエリ（`var()` が使えないため rem 直書き）:

```css
.cafe_list {
  @media (width >= 40rem) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.cafe_list_row {
  @container (width >= 40rem) {
    grid-template-columns: var(--spacing-136) 1fr;
  }
}
```

slot の中身（`:global()` が必要）:

```css
.menu_body {
  /* slot で渡された要素には data-astro-cid が付かないため :global() を使う */
  & :global(.prose) {
    /* … */
  }
}
```

## マークアップの参考例

```html
<dl class="cafe_list">
  <div class="cafe_list_row">
    <dt class="cafe_list_term">住所</dt>
    <dd class="cafe_list_description">{address}</dd>
  </div>
</dl>
```

```css
.cafe_list {
  /* 繰り返し要素は同名を共有する */
}

.cafe_list_row {
  /* この要素のスタイルをすべてここに集める */
}

.cafe_list_term {
  /* 例: font-size: var(--text-sm); line-height: var(--leading-sm); padding-inline: var(--spacing-12); */
}

.cafe_list_description {
  /* 例: min-inline-size: 70%; flex: 9999 0 0; */
}
```
