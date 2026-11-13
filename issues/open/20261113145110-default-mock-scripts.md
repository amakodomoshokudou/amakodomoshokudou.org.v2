# デフォルトの dev / build を mock モードにし、本番用スクリプトを分離する

## 背景

現在の npm script は `dev` / `build` が実 microCMS にアクセスし、モックは `dev:mock` / `build:mock` で明示的に切り替える方式。しかし `astro sync --mode mock` が正常に動かない(別 issue: 20261113145005)など、モード指定の扱いに不整合があり、実値が無い環境ではデフォルトコマンドが失敗する。デフォルトを mock に寄せ、本番用は専用スクリプトで明示的に実行する方式に修正する。

## TODO

- [x] `dev` / `build` をデフォルトで mock モードに変更(判定は `process.env.MODE !== "production"` に反転。未指定 = mock)
- [x] 本番用スクリプトを追加(`dev:production` / `build:production`。実装は `--mode` を使わず環境変数 `MODE=production` を付与する方式に統一)
- [x] `dev:mock` / `build:mock` の扱いを決定(エイリアスとして残す。`MODE=mock` を付与)
- [x] `typecheck` などの関連スクリプトのモード指定を見直し(`MODE=mock astro check` → `astro check`。未指定 = mock のため不要に)
- [x] README の npm script 一覧と環境変数の説明を更新(本番ビルドには microCMS の実値が必要な旨を明記)
- [x] Docker / GitHub Actions など script を直接参照している箇所を合わせて整える
  - [ ] `.github/workflows/deploy.yaml`: `pnpm build`(MICROCMS_* secrets 付き)を `pnpm run build:production` に変更
  - [ ] `.github/workflows/lint.yaml`: typecheck / Build with mock ステップの dummy `MICROCMS_*` env を削除
  - [x] `compose.yaml` の vrt サービスと `vrt` / `vrt:update` script: mock モード前提のまま妥当か確認(dummy `MICROCMS_*` を削除済み)
- [x] 変更後の全スクリプトの動作確認(`astro sync --mode mock` が動かない別 issue の解消が必要かどうか含めて確認)

## 再適用が必要な workflow の変更

一度対応したが、PAT に workflow スコープがなく push できないため `7b2ad3b`(chore: GitHub Actionsのworkflow変更を取り消す)で取り消した。スコープ取得後または GitHub Web UI から再適用する。

**注意**: deploy.yaml を変更しないままマージすると、`pnpm build` が mock ビルド(未指定 = mock)のため、本番デプロイがモックデータで行われる。

- `.github/workflows/deploy.yaml` の Build project ステップ:
  - `run: pnpm build` → `run: pnpm run build:production`
- `.github/workflows/lint.yaml`:
  - `Run typecheck` ステップの `env: MICROCMS_SERVICE_DOMAIN: dummy_domain` / `MICROCMS_API_KEY: dummy_key` を削除
  - `Build with mock` ステップの `env: MICROCMS_SERVICE_DOMAIN: dummy_domain` / `MICROCMS_API_KEY: dummy_key` を削除
