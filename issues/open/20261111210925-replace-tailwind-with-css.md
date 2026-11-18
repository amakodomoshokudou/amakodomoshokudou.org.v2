# Tailwind CSS を通常の CSS に移行する

## 方針

- CSS の具体的な書き方（クラス名の形式、1 要素 1 クラス名、状態・疑似要素のネスト表現、hover の扱い、参考例など）は `css-style` skill（`.agents/skills/css-style/SKILL.md`）を参照する
- `global.css` は CSS 標準のカスケードレイヤー `@layer reset, base, util` で構成する。トークン定義（`:root`）も base レイヤー内に置く。リセットは別ファイル `src/shared/reset.css` に切り出し、`@import "./reset.css" layer(reset)` で読み込む
- トークンは Tailwind の `@theme` が出力していた CSS 変数の名前（`--spacing-84`、`--text-sm` など）を `@layer base` の `:root` で直接定義して維持する。`--container-*` と `--breakpoint-*` は参照が無いため定義しない
- `prose` と `sr-only` は `global.css` の `@layer util` 内の共通クラスとして定義する。`sr-only` は Tailwind のビルトインと同名で使い続ける。それ以外はコンポーネントごとの scoped `<style>` に書き、重複を許容する（新規コンポーネントの切り出しはしない）
- focus は移行中の暫定対応として、旧実装と同じ全フォーカス状態に適用する `:focus` を `@layer base` に global 定義している（マウスフォーカスでも輪郭が出る。当初は各コンポーネントの scoped style に `:focus-visible` を置く方針だったが、breadcrumb リンクや iframe への適用漏れを防ぐため global に一本化した）。移行完了後は `:focus` を使わず `:focus-visible` のみへ絞り込む方針は維持する（その際、マウスフォーカス時には輪郭が出なくなる挙動変化がある）。hover は各コンポーネントの scoped `<style>` でその class に明示する
- `global.css` への追加は限定的とする

## TODO

- 作業時は `css-style` skill を読むこと。規約の正本は skill 側で、この issue の「方針」は決定時点の記録である
- [x] 移行方針を決める（上記「方針」の通り）
- [x] メニュー開状態の VRT をトップページ向けに追加する（背面の img / iframe を `visibility: hidden` で隠して安定させた。ベースライン作成済み）
- [x] VRT で表しきれていない状態を代表ページのみで追加する（ダークモード・コピーボタンの通知表示・area-filter の details 開状態。ベースライン作成済み）
- [x] 移行開始前に VRT のスナップショットが現状と一致していることを確認する（VRT 全実行 OK、ベースライン作成済み）
- [x] `.astro` ファイルの Tailwind クラスを、同じファイルの `<style>` ブロックへ純粋な CSS として移行する。トークンは Tailwind の `@theme` が出力する CSS 変数を `var()` で参照した（この間 Tailwind 依存は残した。全ページの移行完了）
- [x] 移行単位ごとに VRT を実行し、表示差分を確認・修正しながら移行する（全移行単位で VRT 全実行 OK）
- [x] src/shared のコンポーネントを移行する（全ページ共通のため、完了後に全ページの VRT を確認する。VRT 全実行 OK）
- [x] トップページ（views/index）を移行する（VRT 全実行 OK）
- [x] 私たちについて（views/about）を移行する（VRT 全実行 OK）
- [x] 尼崎のこども食堂（views/cafes）を移行する（VRT 全実行 OK）
- [x] こども食堂への支援（views/charity）を移行する（VRT 全実行 OK）
- [x] こども食堂の立ち上げ（views/start-cafe）を移行する（VRT 全実行 OK）
- [x] プライバシーポリシー（views/privacy-policy）を移行する（VRT 全実行 OK）
- [x] 404（views/not-found）を移行する（VRT 全実行 OK）
- [x] `global.css` を純粋な CSS に置き換える: `@import "tailwindcss"` と `@theme` を廃止し、トークンを `@layer base` の `:root` で直接定義する。`--container-*` と `--breakpoint-*` は参照が無いため削除する（旧 `globals.css` から改名。VRT 全実行 OK）
- [x] 自作のリセット CSS を作り preflight と置き換える（`src/shared/reset.css` を作成し、`@layer reset` として読み込み。preflight 由来の `vertical-align: middle` は本サイトで効果が無いため外した。VRT 全実行 OK）
- [ ] 移行中の暫定対応と見送った整理は、`issues/open/20261118103214-clean-up-css.md` に切り出した（リセット CSS の独自化、focus の絞り込み、論理プロパティの統一）
- [x] `@layer` を CSS 標準のカスケードレイヤーに整理し、`@apply` を純粋な CSS に書き換える（`@layer reset, base, util` 構成。`:focus` は暫定として base に global 定義、`.prose` / `.sr-only` は util の通常クラス化。VRT 全実行 OK）
- [x] 移行専用の `tailwind-to-css-migration` skill を削除し、CSS 規約を `css-style` skill（`.agents/skills/css-style/SKILL.md`）として整備する（移行手順を除き、`global.css` の `@layer` 構成、focus の global 定義、`prose` / `sr-only` の util レイヤー化を反映）
- [x] `tailwindcss` と `@tailwindcss/vite` を依存関係から削除し、`astro.config.ts`・`biome.json` の `tailwindDirectives`・dependabot の設定・lockfile を整理する（lockfile はユーザーが `pnpm install` で更新。ビルド成果物の CSS は削除前と完全一致）
- [ ] 最終確認: `build` と `build:mock`、`astro check`、`biome check`、`lint:html`、VRT を実行する
