# Google Fonts アイコンのライセンスを明示する

## 目的

- サイトで使用している Google Fonts のアイコンについて、ライセンス情報を確認し、利用者が確認できる形で明示する

### 対象外(独自デザイン)

- `public/favicon.svg`
- `src/components/layout/Layout/assets/icon.svg`
- `src/components/layout/Layout/assets/name.svg`(ラスタライズした PNG を埋め込んだロゴ)

## TODO

- [x] HTML に SVG が直接記述されている箇所の有無を確認してリスト化する
- [x] Google Fonts アイコン由来のものを SVG ファイルとして `public/icons/` に置き、参照する実装に変更する
- [x] `src/` 以下の SVG ファイルから Google Fonts アイコン由来のものをリスト化する
- [x] `public/icons/` に移動し、参照パスを更新する
- [x] Material Icons の公式ライセンスを確認し、必要なライセンス本文・著作権表示・帰属表示を `public/LICENSES/material-design-icons-LICENSE.txt` に記載する
- [x] ライセンスファイルの内容と公開パスを確認し、サイトのビルドと VRT を実行して表示差分が許容範囲であることを確認する
