# コミット時・push 前の Git hooks を整備する

## 目的

ローカルで必要なチェックを自動実行し、確認漏れや CI での手戻りを減らす。

## TODO

- [x] 既存のチェックと実行コストを整理し、`pre-commit`・`pre-push` で実行する内容を決める
- [x] 追加のパッケージやツールに依存せず、Git 標準の hooks で実装し、設定をリポジトリで共有する
- [x] `package.json` の `setup` スクリプトを明示的に実行して Git hooks をセットアップする
- [x] `pre-commit` に作業ツリー全体の軽量なチェック、`pre-push` に必要な軽量の追加チェックを設定する
- [x] VRT などの高コストなチェックは CI のみで実行し、Git hooks では実行しない
- [x] チェック失敗時にコミット・push が停止し、修正内容を判断できることを確認する
- [x] hooks の導入・更新手順を開発用ドキュメントに記載する

## 対応内容

- `pre-commit` は `pnpm run check` で、未ステージの変更も含む作業ツリー全体を検証する。
- `pre-push` は `pnpm run typecheck` と `pnpm run check` を実行する。
- 既存ツールを使い、チェック本体は `.githooks/`、セットアップは `setup` の Git コマンドで共有する。
