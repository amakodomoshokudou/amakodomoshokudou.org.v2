# デプロイ

main ブランチへの push、または GitHub Actions の手動実行で XServer にデプロイする。デプロイ対象は main ブランチのみとする。

デプロイは同時に 1 つだけ実行し、実行中のデプロイはキャンセルしない。

ワークフローは Node.js 24 と pnpm 12 をセットアップし、lockfile に従って依存関係をインストールした後、microCMS の実データで `build:production` を実行する。`dist/` を rsync で XServer の公開ディレクトリへ転送し、転送先にだけ存在するファイルは削除する。`.user.ini` と `.htaccess` はサーバー側で管理するため、転送対象から除外する。

GitHub Actions には次の secrets を設定する。

- `SSH_PRIVATE_KEY`
- `SSH_HOST`
- `SSH_PORT`
- `SSH_USER`
- `SSH_PROD_REMOTE_DIR`
- `MICROCMS_SERVICE_DOMAIN`
- `MICROCMS_API_KEY`
