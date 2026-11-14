import { MICROCMS_API_KEY, MICROCMS_SERVICE_DOMAIN } from "astro:env/server";
import { createClient } from "microcms-js-sdk";

export const microcmsClient = createClient({
  serviceDomain: MICROCMS_SERVICE_DOMAIN,
  apiKey: MICROCMS_API_KEY,
});
