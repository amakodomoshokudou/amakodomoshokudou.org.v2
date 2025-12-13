import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import astroSsgMsw from "./astro-ssg-msw-integration";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap(), astroSsgMsw()],
  site: import.meta.env.PROD
    ? "https://amakodomoshokudou.org"
    : "http://localhost:4321",
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
  experimental: {
    preserveScriptOrder: true,
  },
});
