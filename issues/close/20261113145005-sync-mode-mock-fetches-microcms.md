# astro sync --mode mock で content sync が microCMS にフェッチする

## 背景

`astro sync --mode mock` を実行すると、`src/content.config.ts` の `isMockMode` が効かず、ローダーが実 microCMS にフェッチしに行って `fetch API response status: 404` で失敗する。`MODE=mock` 環境変数を付けた場合は成功する。変更前のコード(astro.config の env 設定なし)でも再現するため、astro:env 化とは無関係の既存問題。

`pnpm run build:mock`(astro build --mode mock)は正常にモックデータで動作するため、`astro sync` のみで発生する。

## TODO

- [x] 再現手順の整理(`astro sync --mode mock` が失敗し、`MODE=mock astro sync` は成功することを確認済み)
- [x] 原因の特定(`astro sync` は `--mode` フラグを持たないため指定が黙って無視され、`import.meta.env.MODE` が mock にならない。`astro sync --help` のフラグは `--force` のみ。環境変数 `MODE` は `process.env.MODE` 経由で参照できるため成功する)
- [x] 修正方針の決定(単独の `astro sync` は運用で使わないため対応不要とし、`typecheck` の `MODE=mock astro check` で代替。`astro check` は内部で sync を行い、`.astro` を削除した状態でも types が再生成されることを確認)
- [x] `pnpm run typecheck` が通ることの確認(`pnpm exec biome check` / `pnpm run build:mock` も通過)
