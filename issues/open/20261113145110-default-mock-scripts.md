# デフォルトの dev / build を mock モードにし、本番用スクリプトを分離する

## 背景

現在の npm script は `dev` / `build` が実 microCMS にアクセスし、モックは `dev:mock` / `build:mock` で明示的に切り替える方式。しかし `astro sync --mode mock` が正常に動かない(別 issue: 20261113145005)など、モード指定の扱いに不整合があり、実値が無い環境ではデフォルトコマンドが失敗する。デフォルトを mock に寄せ、本番用は専用スクリプトで明示的に実行する方式に修正する。

## TODO

- [ ] `dev` / `build` をデフォルトで mock モードに変更
- [ ] 本番用スクリプトを追加(`dev:production` / `build:production` など、`--mode mock` を付けない形)
- [ ] `dev:mock` / `build:mock` の扱いを決定(デフォルトが mock になるため削除 or エイリアスとして残す)
- [ ] `typecheck` などの関連スクリプトのモード指定を見直し
- [ ] README の npm script 一覧と環境変数の説明を更新(本番ビルドには microCMS の実値が必要な旨を明記)
- [ ] Docker / GitHub Actions など script を直接参照している箇所を合わせて整える
  - [ ] `.github/workflows/deploy.yaml`: `pnpm build`(MICROCMS_* secrets 付き)を本番用スクリプト(`build:production` など)に変更
  - [ ] `.github/workflows/lint.yaml`: `pnpm run build:mock` をデフォルト `pnpm build` に変更、`MICROCMS_*` の dummy 値が不要になるか確認して調整
  - [ ] `compose.yaml` の vrt サービスと `vrt` / `vrt:update` script: mock モード前提のまま妥当か確認
- [ ] 変更後の全スクリプトの動作確認(`astro sync --mode mock` が動かない別 issue の解消が必要かどうか含めて確認)
