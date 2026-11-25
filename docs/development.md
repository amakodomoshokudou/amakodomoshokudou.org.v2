# 開発環境と CI

## モードの切り替え

`MODE` を指定しない場合は mock として動作する。実データ用の環境変数がなくても開発とビルドができるようにするため、既定を mock にしている。

microCMS の実データを使う場合は、`.env` に `MICROCMS_SERVICE_DOMAIN` と `MICROCMS_API_KEY` を設定し、`dev:production` / `build:production` を明示して実行する。

モードは `MODE=production` のような環境変数で指定する。`astro sync` が `--mode` を受け付けず、指定しても無視されるため、Astro の `--mode` は使わない。`astro sync` を直接実行する必要がある場合も `MODE` を付与する。通常は内部で同期を行う `astro check`（`pnpm run typecheck`）を使う。

## VRT

Docker は VRT 専用とし、`compose.yaml` の `dockerfile_inline` でイメージを定義する。Docker Compose 2.17.0 以降で `pnpm run vrt` を実行する。

出力は `playwright-outputs/` 配下にまとめる。リポジトリ全体はマウントせず、出力先と `vrt/` だけをマウントし、実行に必要なファイルはイメージに COPY する。

スクリーンショットのフォント環境を揃えるため、イメージには Noto フォントを入れ、`vrt/fonts.conf` で `sans-serif` と `monospace` の優先フォントを指定する。

CI では表示に影響しない変更だけの場合に VRT を省略する。対象は `issues/`、`.agents/`、`.vscode/`、`docs/`、ルートの `README.md` と `AGENTS.md` で、ページ生成に使う Markdown は一括で除外しない。VRT は必須チェックにせず、`paths-ignore` でワークフロー自体を省略する。
