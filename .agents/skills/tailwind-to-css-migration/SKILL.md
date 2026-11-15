---
name: tailwind-to-css-migration
description: Tailwind CSS のクラスを通常の CSS（Astro の scoped <style>）へ書き換える・移行するときの書き方。Tailwind クラスを剥がす、スタイルを CSS に書き直す、新たにスタイルを当てるときに使う。
---

# Tailwind CSS から通常の CSS への移行の書き方

Tailwind CSS のクラスを `.astro` ファイルの scoped `<style>` へ書き換えるときは、次を守る。
移行が完了した後の新規スタイル記述でも同じルールに従う。

## クラス名

- `block_element` 形式のクラス名を使う
- 1 つの要素には 1 つのクラス名を書き、その要素のスタイルをすべてそのクラスに集約する
- クラス名はコンポーネント内で別々の役割には重複して使わない。同じ構造の繰り返し要素（ループやコピペで並ぶ行）は同名を共有してよい
- `prose` のみ `globals.css` の共通クラスとして定義する。それ以外はコンポーネントごとの scoped `<style>` に書き、重複を許容する（新規コンポーネントの切り出しはしない）

## 状態・疑似要素の表現

状態・疑似要素・疑似クラスは、対応するクラスのブロック内に CSS ネスティング（`&`）で表現する。

- `aria-[current=page]:bg-*` → `&[aria-current="page"]`、`aria-[current]:bg-*` → `&[aria-current]`、`data-[open=true]:border` → `&[data-open="true"]`
- `::-webkit-details-marker` などの疑似要素も `&::-webkit-details-marker { … }` とネストする
- 祖先の状態に連動するもの（`group-open:`）は祖先要素（`details`）のクラス内で `&[open] .icon { … }` とする
- `dark:invert` は `@media (prefers-color-scheme: dark)` 内にネストする

## hover・focus

- hover は `@media (any-hover: hover)` で囲んで `&:hover` とする
- focus は `:focus` を使わず `:focus-visible` のみとする
- これらのインタラクションスタイルは global に置かず、各コンポーネントの scoped `<style>` でその class に明示する

## Astro scoped style の仕様

- スコープは `data-astro-cid-*` 属性セレクタで付与される。specificity が属性分の 0,1,0 増える
- slot の中身にはスコープの data 属性が付かないため、スタイルが必要な場合は `:global()` を使う
- メディアクエリ・コンテナクエリ内では `var()` が使えないため、ブレークポイントは rem 直書き（sm 40rem / md 48rem / lg 64rem / xl 80rem / 2xl 96rem、`@container` は 22.25rem / 40rem）

## 移行期間の経過措置（移行完了まで）

- トークンは Tailwind の `@theme` が出力する CSS 変数を `var()` で参照する（`--spacing-84`、`--text-sm` など）。移行完了後の `:root` 定義でも変数名は維持する

## ネストの参考例

実際にコードベースにある状態の書き換え例。

`aria-[current=page]`・`aria-[current]`（layout.astro / pagination.astro のナビ）:

```css
.nav_link {
  /* Tailwind: bg-secondary-background aria-[current=page]:bg-secondary-background */
  background-color: var(--color-primary-background);

  &[aria-current="page"] {
    background-color: var(--color-secondary-background);
  }
}

.pagination_link {
  /* Tailwind: aria-[current]:bg-secondary-background */
  &[aria-current] {
    background-color: var(--color-secondary-background);
  }
}
```

`data-[open=true]`（copy-button.astro の通知）:

```css
.copy_notify {
  /* Tailwind: data-[open=true]:border data-[open=true]:p-4 */
  &[data-open="true"] {
    border: 1px solid var(--color-secondary-border);
    padding: var(--spacing-4);
  }
}
```

疑似要素と祖先の状態（area-filter.astro の `::-webkit-details-marker` と `group-open:`）:

```css
.filter_summary {
  /* Tailwind: [&::-webkit-details-marker]:hidden */
  &::-webkit-details-marker {
    display: none;
  }
}

.filter_icon {
  /* Tailwind: group-open:rotate-180
     祖先の details のクラス内ではなく、icon のクラスから
     親の状態を is() で参照して書くこともできる */
  &:is(details[open] *) {
    rotate: 180deg;
  }
}
```

祖先のクラスから書く場合は次のようになる:

```css
.filter_summary {
  /* Tailwind: group-open:rounded-b-none（summary 自身への状態） */
  &[open] {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  /* Tailwind: group-open:rotate-180（子孫への連動） */
  &[open] .filter_icon {
    rotate: 180deg;
  }
}
```

ダークモード（layout.astro の `dark:invert`）:

```css
.logo_name {
  /* Tailwind: dark:invert */
  @media (prefers-color-scheme: dark) {
    & {
      filter: invert(1);
    }
  }
}
```

hover と focus（新規に書く場合の例）:

```css
.nav_link {
  @media (any-hover: hover) {
    &:hover {
      background-color: var(--color-tertiary-background);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--color-outline);
    outline-offset: 2px;
  }
}
```

レスポンシブとコンテナクエリ（`var()` が使えないため rem 直書き）:

```css
.cafe_list {
  /* Tailwind: sm:grid-cols-2 */
  @media (width >= 40rem) {
    & {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

.cafe_list_row {
  /* Tailwind: @640:grid-cols-[var(--spacing-136)_1fr] */
  @container (width >= 40rem) {
    & {
      grid-template-columns: var(--spacing-136) 1fr;
    }
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

## 参考例

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
