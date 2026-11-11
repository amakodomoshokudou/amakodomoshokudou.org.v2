# Tailwind CSS を通常の CSS に移行する

## TODO

- [ ] reset.css を自作のリセット CSS に置き換える
- [ ] `globals.css` の `@layer` を CSS 標準のカスケードレイヤーに整理し、グローバルな定義を `base` レイヤーへ移す
- [ ] `globals.css` 内の Tailwind 記法を純粋な CSS に書き換える
- [ ] `.astro` ファイルの Tailwind クラスを、同じファイルの `<style>` ブロックへ純粋な CSS として移行し、クラス名は `todo_title` のような形式にする
- [ ] ページごとに VRT を実行し、表示差分を確認・修正しながら移行する
- [ ] `tailwindcss` と `@tailwindcss/vite` を依存関係から削除し、関連設定を整理して lockfile を更新する
