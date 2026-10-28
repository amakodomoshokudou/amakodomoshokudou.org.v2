# VRT 用の Docker 構成を整理する

## 目的

Docker は VRT のみに使用しているため、VRT 専用として構成を簡潔にする。

## TODO

- [x] `Dockerfile.vrt` を Compose の `dockerfile_inline` に統合する
- [x] Playwright のレポート・テスト結果の出力先を `playwright-outputs/` 配下にまとめる
- [x] レポート・テスト結果がホスト側に保存されることを確認する
- [x] リポジトリ全体の bind mount をやめ、出力フォルダと実行に必要な最小限のファイル・フォルダだけを mount または COPY する
- [x] CI の成果物アップロード先を `playwright-outputs/` に更新する
- [ ] CI 失敗時のレポート・テスト結果を取得できることを確認する
- [x] ローカルで VRT の実行を確認する
- [ ] CI で VRT の実行を確認する

## 検証状況

`docker compose config --quiet` と `pnpm run check` は通過。ローカルでの VRT 実行と `playwright-outputs/` へのレポート・テスト結果の保存は確認済み。GitHub Actions 上での実行・成果物取得は未確認。
