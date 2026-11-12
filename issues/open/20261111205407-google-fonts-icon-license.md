# Google Fonts アイコンのライセンスを明示する

## 目的

- サイトで使用している Google Fonts のアイコンについて、ライセンス情報を確認し、利用者が確認できる形で明示する

## 対象箇所

### HTML に直接記述されている SVG(いずれも同一パスの「外部リンク」アイコン)

`open_in_new` を `public/icons/open_in_new.svg` に配置し、`mask-[url(...)]` クラスでの参照に置き換え済み。

- `src/components/layout/Layout/Layout.astro` (83 行目付近、モバイルメニューのナビゲーション)
- `src/components/layout/Layout/Layout.astro` (123 行目付近、デスクトップのグローバルナビゲーション)
- `src/components/ui/TextLink/TextLink.astro` (13 行目付近)

### `src/` 以下の SVG ファイル

- `src/components/page/Cafes/AreaFilter/assets/icon.svg`(arrow_drop_down 相当)
- `src/components/ui/Breadcrumb/assets/icon.svg`(chevron_right 相当)
- `src/components/ui/ButtonLink/assets/icon.svg`(arrow_forward 相当)
- `src/components/ui/CopyButton/assets/icon.svg`(content_copy 相当)
- `src/components/ui/DownloadLink/assets/icon.svg`(download 相当)
- `src/components/ui/Menu/assets/close.svg`(close 相当)
- `src/components/ui/Menu/assets/menu.svg`(menu 相当)
- `src/components/ui/NextStep/assets/icon.svg`(south 相当)
- `src/components/ui/ToSectionLink/assets/icon.svg`(expand_more 相当)

補足: `CopyButton` / `ButtonLink` / `Breadcrumb` / `Menu` / `NextStep` / `DownloadLink` / `ToSectionLink` は `astro:assets` の `getImage()` で SVG を参照し、CSS の `mask-image` で着色している。`public/icons/` に移動した場合はマスク先を直接 URL にする必要がある。

### 対象外(独自デザイン)

- `public/favicon.svg`
- `src/components/layout/Layout/assets/icon.svg`
- `src/components/layout/Layout/assets/name.svg`(ラスタライズした PNG を埋め込んだロゴ)

## TODO

- [x] HTML に SVG が直接記述されている箇所の有無を確認してリスト化する
- [x] Google Fonts アイコン由来のものを SVG ファイルとして `public/icons/` に置き、参照する実装に変更する
- [x] `src/` 以下の SVG ファイルから Google Fonts アイコン由来のものをリスト化する
- [ ] `public/icons/` に移動し、参照パスを更新する
- [x] Material Icons の公式ライセンスを確認し、必要なライセンス本文・著作権表示・帰属表示を `public/LICENSES/material-design-icons-LICENSE.txt` に記載する
- [ ] 掲載内容とリンクが正しいことを確認し、サイトのビルドと VRT を実行して意図しない表示差分がないことを確認する
