# 尼崎こども食堂ネットワーク サイト

## 開発環境

### 環境変数の設定

モック / 本番の切り替えは環境変数 `MODE`(`mock` / `production`)で行い、未指定の場合は mock になります。

`pnpm run dev` / `pnpm run build` はデフォルトでモックデータを使用するため、環境変数の設定は不要です。

`pnpm run dev:production` / `pnpm run build:production` で microCMS の実データを扱う場合は、`.env`ファイルをルートディレクトリに作成し、以下の環境変数を設定してください。

```
MICROCMS_SERVICE_DOMAIN=xxxx
MICROCMS_API_KEY=xxxx
```

### npm script一覧

| スクリプト名              | 説明                                          |
| ------------------------- | --------------------------------------------- |
| pnpm i                    | 依存関係のインストール                        |
| pnpm run setup            | Git hooks のセットアップ                      |
| pnpm run dev              | ローカルサーバー起動(モックデータ)            |
| pnpm run dev:mock         | ローカルサーバー起動(モックデータ)(devの別名) |
| pnpm run dev:production   | ローカルサーバー起動(microCMSの実データ)      |
| pnpm run build            | サイトのビルド(モックデータ)                  |
| pnpm run build:mock       | サイトのビルド(モックデータ)(buildの別名)     |
| pnpm run build:production | サイトのビルド(microCMSの実データ)            |
| pnpm run start            | ビルド後のプレビュー                          |
| pnpm run typecheck        | 型チェック                                    |
| pnpm run check            | Biome で検証                                  |
| pnpm run check:fix        | Biome で自動修正                              |

### Git hooks

依存関係のインストール後、`pnpm run setup` を明示的に実行して Git hooks をセットアップしてください。

### VRT

Docker Compose 2.17.0 以降で実行できます。microCMS の環境変数の設定は不要です。
- `pnpm run vrt`：モックデータで画像比較
- `pnpm run vrt:update`：`vrt/screenshot.spec.ts-snapshots/` のスナップショットを更新
- `pnpm exec playwright show-report playwright-outputs/report`：レポートを表示

出力は `playwright-outputs/` に保存され、CI では失敗時の成果物として取得できます。

## デプロイ

Github Actionsを使用して、SSH経由でXServerに自動デプロイ

## 使用技術

- フレームワーク：Astro
- 言語：TypeScript
- CSS：TailwindCSS
- HeadlessCMS：microCMS
- サーバ: XServer
- デプロイ：Github Actions経由のSSH & Rsync
