# astro sync --mode mock で content sync が microCMS にフェッチする

## 背景

`astro sync --mode mock` を実行すると、`src/content.config.ts` の `isMockMode` が効かず、ローダーが実 microCMS にフェッチしに行って `fetch API response status: 404` で失敗する。`MODE=mock` 環境変数を付けた場合は成功する。変更前のコード(astro.config の env 設定なし)でも再現するため、astro:env 化とは無関係の既存問題。

`pnpm run build:mock`(astro build --mode mock)は正常にモックデータで動作するため、`astro sync` のみで発生する。

## TODO

- [ ] 再現手順の整理(`astro sync --mode mock` が失敗し、`MODE=mock astro sync` は成功することを確認済み)
- [ ] 原因の特定(sync 時に `--mode` が `content.config.ts` の `import.meta.env.MODE` / `process.env.MODE` に反映されない経路を調査)
- [ ] 修正方針の決定と実装(例: `astro.config.ts` でモードに応じた対処、`isMockMode` 判定の見直し、npm script の修正など)
- [ ] `astro sync --mode mock` がモックデータで成功することを確認
