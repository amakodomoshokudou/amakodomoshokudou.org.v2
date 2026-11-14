# `src` 以下のディレクトリ構成を整理する

`src` 以下のコードを責務ごとに配置し、ページ固有のファイルをページ単位でまとめる。

- `src/pages/`: Astro のルーティング用ファイル
- `src/views/`: ページ固有のコンポーネント、定数、画像などのアセット。ページ単位でコロケーションする
- `src/shared/`: 複数ページで使う UI・レイアウト・CSS・定数・ユーティリティと microCMS クライアント
- `src/modules/cafe/`: カフェ・エリアのスキーマ、取得処理、モック、並び替え処理
- `src/content.config.ts`: Astro のコンテンツコレクション設定として `src` 直下に置く

## TODO

- [x] `src/components/page/` のページ固有ファイルと専用の定数・アセットを、対応する `src/views/` のページ別ディレクトリへ移す
- [x] `src/components/ui/`、`src/components/layout/`、`src/styles/`、共通の定数・ユーティリティ、`src/libs/microcms/` を `src/shared/` へ移す
- [x] `src/features/cafe/` を `src/modules/cafe/` へ移す
- [x] `src/pages/` と `src/content.config.ts` の配置を維持し、移動に伴う import パスを更新する
- [x] 不要になったディレクトリを整理し、型チェックとビルドが通ることを確認する

## TODO(同一名称単一ファイルのディレクトリをflat化)

- [x] `src/views/cafes/` 配下の `area-filter/`・`cafe-list/`・`pagination/` をflatにする(`views/cafes/area-filter.astro` など)。`cafe-list/assets` は `src/views/cafes/assets` にまとめる
- [x] `src/shared/ui/` 配下の各コンポーネントディレクトリをflatにする。`activities/assets` は `src/shared/ui/assets` にまとめる。`breadcrumb/type.ts` は `breadcrumb-type.ts` に改名して同階層へ置く
- [x] `src/shared/layout/` 配下の `layout/`・`document/` をflatにする。`layout/assets` は `src/shared/layout/assets` にまとめる
- [x] 移動に伴う import パスを更新する
- [x] 型チェックとビルドが通ることを確認する

## TODO(shared直下へのflat化)

- [x] `src/shared/` 配下の `consts/`・`layout/`・`libs/`・`styles/`・`ui/` をなくし、全ファイルを `src/shared/` 直下に並べる
- [x] `libs/microcms/index.ts` は `src/shared/microcms.ts` とする
- [x] `layout/assets` と `ui/assets` は `src/shared/assets/` に統合する
- [x] 移動に伴う import パスを更新する
- [x] 型チェックとビルドが通ることを確認する
