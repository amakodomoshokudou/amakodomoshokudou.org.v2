# src 以下のファイル名・ディレクトリ名を kebab-case にする

## 背景・目的

- Biome で `src` 以下のファイル名・ディレクトリ名を kebab-case に統一する。

## TODO

- [x] `biome.json` に `overrides` を追加し、`src/**` 配下のみ `linter.rules.style.useFilenamingConvention` を `error`・`options.filenameCases: ["kebab-case"]` で有効にする(2.6.4 では `style` グループの `useFilenamingConvention`)
- [x] `src` 以下の kebab-case 非準拠のファイル名・ディレクトリ名をリネームする
  - 例: `AboutPage.astro` → `about-page.astro`、`bankAccount.ts` → `bank-account.ts`、`About/` → `about/`、`_Index/` → `_index/`
- [x] リネームに伴い `src` 内の import / component 参照のパスを修正する
- [x] `pnpm check` で `useFilenamingConvention` のエラーが 0 件になり、参照切れがないことを確認する

## 備考

- Biome の `useFilenamingConvention` はファイル名のみを検査し、ディレクトリ名は対象外(新規ディレクトリの自動強制は不可)。
