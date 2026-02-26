import type { AstroIntegration } from "astro";
import { server as mockServer } from "./src/mock/node";

// https://astro.build/config
export default function astroSSGMSWIntegration(): AstroIntegration {
  return {
    name: "astro-ssg-msw-integration",
    hooks: {
      "astro:config:setup": ({ logger }) => {
        if (_use_mock) {
          mockServer.listen();
          logger.info("mock listen !!!");
        }
      },
      "astro:server:start": ({ logger }) => {
        if (_use_mock) {
          mockServer.listen();
          logger.info("mock listen !!!");
        }
      },
      "astro:server:done": ({ logger }) => {
        if (_use_mock) {
          mockServer.close();
          logger.info("mock close !!!");
        }
      },
      "astro:build:start": ({ logger }) => {
        if (_use_mock) {
          mockServer.listen();
          logger.info("mock listen !!!");
        }
      },
      "astro:build:done": ({ logger }) => {
        if (_use_mock) {
          mockServer.close();
          logger.info("mock close !!!");
        }
      },
    },
  };
}
// Viteの仕様として、vite dev --mode <xxx>, vite build --mode <xxx> とすると、import.meta.env.MODEに xxx が設定されるが、
// Astroの仕様として、astro dev --mode <xxx>の際には、import.meta.env.MODEに xxx ではなく必ず development が設定されてしまう
// なお、astro buildの際には vite buildのときと同じように --mode <xxx> が設定される

// そのためmockを使用するかどうかは、実行中のnpm scriptを取得して、--mode mock が指定されているかどうかで判定する
// 実行中の npm script を取得
const _run_npm_script = process.env.npm_lifecycle_script;
// --mode mock が指定されている場合、mock モードとして動作する
const _use_mock =
  typeof _run_npm_script === "string" &&
  _run_npm_script.includes("--mode mock");
