# Google Fonts アイコンのライセンスを明示する

## 目的

- サイトで使用している Google Fonts のアイコンについて、ライセンス情報を確認し、利用者が確認できる形で明示する

## TODO

- [ ] HTML に SVG が直接記述されている箇所の有無を確認し、Google Fonts アイコン由来のものがあれば SVG ファイルとして `public/icons/` に置き、参照する実装に変更する
- [ ] `src/` 以下の SVG ファイルから Google Fonts アイコン由来のものを特定して `public/icons/` に移動し、参照パスを更新する
- [ ] Material Icons の公式ライセンスを確認し、必要なライセンス本文・著作権表示・帰属表示を `public/LICENSES/material-design-icons-LICENSE.txt` に記載する
- [ ] 掲載内容とリンクが正しいことを確認し、サイトのビルドと VRT を実行して意図しない表示差分がないことを確認する
