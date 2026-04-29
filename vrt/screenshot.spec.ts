import { expect, test } from "@playwright/test";

const paths = [
  "/",
  "/about/",
  "/cafes/",
  "/cafes/2/", // ページ分割されているものは2ページ目まではスクリーンショットを撮る // 3ページ以降は同じなので省略
  ...["muko", "tachibana", "sonoda", "osho", "chuo", "oda"].flatMap((slug) => [
    `/cafes/areas/${slug}/`,
    `/cafes/areas/${slug}/2/`,
  ]),
  "/charity/",
  "/privacy-policy/",
  "/start-cafe/",
  "/404/",
];

for (const path of paths) {
  test(`screenshot[${path}]`, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => {
      // 画面が狭い時にheaderが上部に固定されているので、スクリーンショットを撮るときには固定を解除する
      const header = document.querySelector("header");
      if (!header) throw new Error("Header not found");
      header.style.position = "static";

      // サイドバーとメイン部分でそれぞれスクロールさせている関係で、fullPageでスクリーンショット撮ってもサイドバー分の高さしか撮れないので、
      // ラッパーの高さをautoにして、ページ全体を撮れるようにする（サイドバーの固定は解除されるが、スクリーンショットのためなので問題ない）
      const wrapper = document.querySelector<HTMLDivElement>("body > div");
      if (!wrapper) throw new Error("Wrapper not found");
      wrapper.style.blockSize = "auto";
    });

    await expect(page).toHaveScreenshot({
      fullPage: true,
      // 画像を読み込んでサイズを確定させた上で、微妙なブレを防ぐために、マスクをする
      // Todo: より細かい画像の指定をして、マスクするものとしないものを分ける
      mask: [page.locator("img"), page.locator("iframe")],
    });
  });
}
