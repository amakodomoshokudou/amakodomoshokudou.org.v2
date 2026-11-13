import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
  site: import.meta.env.PROD ? "https://amakodomoshokudou.org" : "http://localhost:4321",
  env: {
    schema: {
      MICROCMS_SERVICE_DOMAIN: envField.string({
        context: "server",
        access: "secret",
        default: "sample-service-domain",
      }),
      MICROCMS_API_KEY: envField.string({
        context: "server",
        access: "secret",
        default: "sample-api-key",
      }),
    },
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  trailingSlash: "always",
  build: {
    assets: "assets",
  },
  outDir: "dist",
});
