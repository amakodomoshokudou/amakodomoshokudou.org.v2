# `src` 以下のディレクトリ構成を整理する

`src` 以下のコードを責務ごとに配置し、ページ固有のファイルをページ単位でまとめる。

- `src/pages/`: Astro のルーティング用ファイル
- `src/views/`: ページ固有のコンポーネント、定数、画像などのアセット。ページ単位でコロケーションする
- `src/shared/`: 複数ページで使う UI・レイアウト・CSS・定数・ユーティリティと microCMS クライアント
- `src/modules/cafe/`: カフェ・エリアのスキーマ、取得処理、モック、並び替え処理
- `src/content.config.ts`: Astro のコンテンツコレクション設定として `src` 直下に置く

## TODO

- [ ] `src/components/page/` のページ固有ファイルと専用の定数・アセットを、対応する `src/views/` のページ別ディレクトリへ移す
- [ ] `src/components/ui/`、`src/components/layout/`、`src/styles/`、共通の定数・ユーティリティ、`src/libs/microcms/` を `src/shared/` へ移す
- [ ] `src/features/cafe/` を `src/modules/cafe/` へ移す
- [ ] `src/pages/` と `src/content.config.ts` の配置を維持し、移動に伴う import パスを更新する
- [ ] 不要になったディレクトリを整理し、型チェックとビルドが通ることを確認する
