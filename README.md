# 尼崎こども食堂ネットワーク サイト

## 開発環境

### 環境変数の設定

`.env`ファイルをルートディレクトリに作成し、以下の環境変数を設定してください。

```
MICROCMS_SERVICE_DOMAIN=xxxx
MICROCMS_API_KEY=xxxx
```

### 依存関係のインストール

`pnpm i`

### ローカルサーバー起動

#### Mockなし

`pnpm run dev`

#### Mockあり

`pnpm run dev:mock`

### ビルド

#### Mockなし

`pnpm run build`

#### Mockあり

`pnpm run build:mock`

### プレビュー

`pnpm run start`

### デプロイ

- [x] 手動でデプロイ
- [ ] GitHub Actionsで自動デプロイ

#### 手動でデプロイ

1. `pnpm run build`
2. /distディレクトリ以下のファイルを全てサーバーにアップロード

## 使用技術

- フレームワーク：Astro
- 言語：TypeScript
- CSS：TailwindCSS
- HeadlessCMS：microCMS
