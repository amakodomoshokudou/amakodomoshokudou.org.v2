# 尼崎こども食堂ネットワーク サイト

## 開発環境

### 環境変数の設定

`.env`ファイルをルートディレクトリに作成し、以下の環境変数を設定してください。

```
MICROCMS_SERVICE_DOMAIN=xxxx
MICROCMS_API_KEY=xxxx
```

### npm script一覧

| スクリプト名        | 説明                           |
| ------------------- | ------------------------------ |
| pnpm i              | 依存関係のインストール         |
| pnpm run dev        | ローカルサーバー起動           |
| pnpm run dev:mock   | Mockありでローカルサーバー起動 |
| pnpm run build      | 本番用ビルド                   |
| pnpm run build:mock | Mockありで本番用ビルド         |
| pnpm run start      | ビルド後のプレビュー           |
| pnpm run typecheck  | モックデータで型チェック       |
| pnpm run check      | Biome・Prettier で検証         |
| pnpm run check:fix  | Biome・Prettier で自動修正     |

### Git hooks

依存関係のインストール後、`pnpm run setup` を明示的に実行して Git hooks をセットアップしてください。

## デプロイ

Github Actionsを使用して、SSH経由でXServerに自動デプロイ

## 使用技術

- フレームワーク：Astro
- 言語：TypeScript
- CSS：TailwindCSS
- HeadlessCMS：microCMS
- サーバ: XServer
- デプロイ：Github Actions経由のSSH & Rsync
