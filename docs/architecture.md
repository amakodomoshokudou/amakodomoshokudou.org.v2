# ディレクトリ構成

`src/pages/` はルーティング、`src/views/` はページ固有、`src/shared/` は複数ページ共通、`src/modules/` は機能単位の処理を置く。`src/content.config.ts` はコンテンツコレクション設定。

単一ファイルのためにディレクトリを作らない。共通アセットは `src/shared/assets/`、定数は `src/shared/const.ts` にまとめる。
