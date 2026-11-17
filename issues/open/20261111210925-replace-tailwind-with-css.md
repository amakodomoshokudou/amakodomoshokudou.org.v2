# Tailwind CSS を通常の CSS に移行する

## 方針

- 移行時の具体的な書き方（クラス名の形式、1 要素 1 クラス名、状態・疑似要素のネスト表現、hover・focus の扱い、参考例など）は `tailwind-to-css-migration` skill（`.agents/skills/tailwind-to-css-migration/SKILL.md`）を参照する
- `prose` と `sr-only` を `globals.css` の共通クラス（`@utility`）として定義する。`sr-only` は Tailwind のビルトインを上書きし、廃止後も同名で使い続ける。それ以外はコンポーネントごとの scoped `<style>` に書き、重複を許容する（新規コンポーネントの切り出しはしない）
- Tailwind の `@theme` が出力する CSS 変数の名前（`--spacing-84`、`--text-sm` など）は最終段の `:root` 定義でも維持する
- `globals.css` への追加は限定的とする。hover・focus などのインタラクションスタイルは global に置かず、各コンポーネントの scoped `<style>` でその class に明示する

## TODO

- 作業時は `tailwind-to-css-migration` skill を読むこと。規約の正本は skill 側で、この issue の「方針」は決定時点の記録である
- [x] 移行方針を決める（上記「方針」の通り）
- [x] メニュー開状態の VRT をトップページ向けに追加する（背面の img / iframe を `visibility: hidden` で隠して安定させた。ベースライン作成済み）
- [x] VRT で表しきれていない状態を代表ページのみで追加する（ダークモード・コピーボタンの通知表示・area-filter の details 開状態。ベースライン作成済み）
- [x] 移行開始前に VRT のスナップショットが現状と一致していることを確認する（VRT 全実行 OK、ベースライン作成済み）
- [ ] `.astro` ファイルの Tailwind クラスを、同じファイルの `<style>` ブロックへ純粋な CSS として移行する。トークンは Tailwind の `@theme` が出力する CSS 変数を `var()` で参照する（この間 Tailwind 依存は残す）
- [ ] 移行単位ごとに VRT を実行し、表示差分を確認・修正しながら移行する
- [x] src/shared のコンポーネントを移行する（全ページ共通のため、完了後に全ページの VRT を確認する。VRT 全実行 OK）
- [x] トップページ（views/index）を移行する（VRT 全実行 OK）
- [x] 私たちについて（views/about）を移行する（VRT 全実行 OK）
- [ ] 尼崎のこども食堂（views/cafes）を移行する
- [x] こども食堂への支援（views/charity）を移行する（VRT 全実行 OK）
- [x] こども食堂の立ち上げ（views/start-cafe）を移行する（VRT 全実行 OK）
- [x] プライバシーポリシー（views/privacy-policy）を移行する（VRT 全実行 OK）
- [x] 404（views/not-found）を移行する（VRT 全実行 OK）
- [ ] `globals.css` を純粋な CSS に置き換える: `@import "tailwindcss"` と `@theme` を廃止し、トークンを `:root` の CSS 変数として直接定義する
- [ ] `--spacing-*` と `--container-*` のトークンの区別を明確にする。`max-w-640` など Tailwind では `--container-*` に解決される参照が移行後 `--spacing-*` で代用されており、値が同一のため現状は等価だが、最終段の `:root` 定義時に用途ごとの参照先を整理する（移行済みページでは `--spacing-*` 参照に統一されている）
- [ ] 物理プロパティ（`margin-left` / `padding-left` / `padding-right` / `border-left` など left / right / top / bottom を使う宣言）を論理プロパティ（`*-inline-start` / `*-inline-end` / `*-block-start` / `*-block-end`）に統一する。移行済みの scoped style で混在しているものを整理する
- [ ] 自作のリセット CSS を作り preflight と置き換える
- [ ] `@layer` を CSS 標準のカスケードレイヤーに整理し、`@apply` を純粋な CSS に書き換える（`:focus` / `:focus-visible` のスタイルは方針に従い、対象要素を持つコンポーネントの scoped style へ移す）
- [ ] `tailwindcss` と `@tailwindcss/vite` を依存関係から削除し、`astro.config.ts`・`biome.json` の `tailwindDirectives`・dependabot の設定・lockfile を整理する
- [ ] 最終確認: `build` と `build:mock`、`astro check`、`biome check`、`lint:html`、VRT を実行する
