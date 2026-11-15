import { expect, type Page, test } from "@playwright/test";

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

// ページを開いて、fullPage で撮れるようにレイアウトを調整する
const preparePage = async (page: Page, path: string) => {
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
};

// 画像を読み込んでサイズを確定させた上で、微妙なブレを防ぐために、マスクをする
// Todo: より細かい画像の指定をして、マスクするものとしないものを分ける
const screenshotOptions = (page: Page) => ({
  fullPage: true,
  mask: [page.locator("img"), page.locator("iframe")],
});

for (const path of paths) {
  test(`screenshot[${path}]`, async ({ page }) => {
    await preparePage(page, path);

    await expect(page).toHaveScreenshot(screenshotOptions(page));
  });
}

test("screenshot-dark[/]", async ({ page }) => {
  // 全ページでダークモードの差分を撮ると時間がかかるため、トップページだけで確認する
  await page.emulateMedia({ colorScheme: "dark" });
  await preparePage(page, "/");

  await expect(page).toHaveScreenshot(screenshotOptions(page));
});

test("screenshot-menu-open[/]", async ({ page }) => {
  // メニューの開閉ボタンは lg (64rem) 未満でしか表示されないので、狭いビューポートにして開く
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "メニュー" }).click();

  // dialog の背面のページが半透明で透過するため、背面の img と iframe を隠して安定させる
  // （layout は保持される。Playwright の mask オプションは dialog の背面の要素にも矩形が
  // 描画されトップレイヤーの dialog の上に被るので使わない）
  await page.locator("img, iframe").evaluateAll((elements) => {
    for (const element of elements) {
      element.style.visibility = "hidden";
    }
  });

  await expect(page).toHaveScreenshot();
});

test("screenshot-menu-copy-notify[/]", async ({ page }) => {
  // コピーボタンの通知はメニュー dialog 内にもあるので、メニューを開いた状態でクリックする
  // （通知は data-open=true になると border と padding が付き、コピー結果のテキストが出る）
  await page.setViewportSize({ width: 390, height: 844 });
  // クリップボードへの書き込みが許可されていない環境では「コピーに失敗しました」が表示される
  // （webkit では grantPermissions が clipboard-write をサポートしないため失敗時の表示で安定させる）
  await page
    .context()
    .grantPermissions(["clipboard-write"])
    .catch(() => undefined);
  await page.goto("/");
  await page.getByRole("button", { name: "メニュー" }).click();
  await page.getByRole("button", { name: "メールアドレスをコピー" }).click();

  await page.locator("img, iframe").evaluateAll((elements) => {
    for (const element of elements) {
      element.style.visibility = "hidden";
    }
  });

  await expect(page).toHaveScreenshot();
});

test("screenshot-area-filter-open[/cafes/]", async ({ page }) => {
  // area-filter の details は初期状態が閉じているので、開いた状態を撮る
  // （group-open のスタイルが効く状態）
  await preparePage(page, "/cafes/");
  await page.locator("summary").click();

  await expect(page).toHaveScreenshot(screenshotOptions(page));
});
