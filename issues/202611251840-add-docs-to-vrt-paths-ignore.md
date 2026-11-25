---
title: VRTのpaths-ignoreにdocsを追加する
description: docs配下だけを変更したPRでVRTを実行しないようにする
createdAt: 2026-11-25T18:40:52+09:00
---

## 目的

- `docs/` 配下の文書だけを変更した PR で VRT が実行されないようにする
- リポジトリの設定を変更する権限を持つメンバーが対応できるよう、作業内容を issue に残す

## 仕様

- `.github/workflows/vrt.yaml` の `on.pull_request.paths-ignore` に `"docs/**"` を追加する
- 追加位置は `.vscode/**` の次、`README.md` の前とする
- 既存の項目と同様にダブルクォートで囲む
- `docs/` 以外のファイルを含む PR では、これまでどおり VRT を実行する

## TODO

- [ ] `.github/workflows/vrt.yaml` の `paths-ignore` に `"docs/**"` を追加する
- [ ] `docs/` 配下だけを変更した PR で VRT がスキップされることを確認する
