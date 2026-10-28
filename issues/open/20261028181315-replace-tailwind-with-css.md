# Tailwind CSS を通常の CSS に移行する

## 目的

- Tailwind CSS 関連の依存を削減し、サプライチェーンリスクを減らす
- 通常の CSS を使い、最新の CSS 機能を活用する
- フレームワーク固有の構文や設定を減らし、保守コストを下げる

## TODO

- [ ] `@theme` を `:root` の CSS 変数に移し、`@apply`・`@utility` を通常の CSS に置き換える
- [ ] 共通のレイアウト・タイポグラフィ・カード・`.prose` をグローバル CSS にまとめ、必要最小限の reset を整える
- [ ] UI、ページ、共通 Layout の順に Tailwind クラスを Astro の `<style>` と共通 CSS に段階的に移行する
- [ ] レスポンシブ・コンテナクエリ・ダークモード・状態依存のスタイルを CSS セレクタや `data-*` 属性で再現する
- [ ] Tailwind 固有のクラス・ディレクティブが残っていないことを確認する
- [ ] `tailwindcss`・`@tailwindcss/vite`・`prettier-plugin-tailwindcss` と関連設定を削除し、lockfile を更新する
- [ ] `pnpm run check`・`pnpm run build`・`pnpm run lint:biome`・`pnpm run vrt` で検証し、表示や操作の意図しない差分を解消する
