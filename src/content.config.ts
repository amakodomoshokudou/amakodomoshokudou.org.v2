import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { microcmsClient } from "./libs/microcms";

const microcmsAreaSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  priority: z.number(),
});

const areaSchema = microcmsAreaSchema;

const microcmsCafeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z
    .object({
      url: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  area: areaSchema,
  address: z.string(),
  schedule: z.string(),
  host: z.string(),
  contact: z.string().optional(),
});

// microCMSからのデータが都合が悪い部分のみ、必要な形に変換するためのschema
const cafeSchema = microcmsCafeSchema.transform((cafe) => ({
  id: cafe.id,
  slug: cafe.slug,
  name: cafe.name,
  image: cafe.image
    ? {
        src: cafe.image.url,
        width: cafe.image.width,
        height: cafe.image.height,
      }
    : null,
  area: cafe.area,
  address: cafe.address,
  schedule: cafe.schedule,
  host: cafe.host,
  contact: cafe.contact ?? "", // contactがnullの場合は空文字を設定
}));

const areasCollection = defineCollection({
  loader: async () => {
    const { contents } = await microcmsClient.getList<unknown>({
      endpoint: "areas",
      queries: {
        fields: "id,name,slug,priority",
        orders: "priority",
        limit: 100, // 全部取得するために、最大値の100を指定
        offset: 0,
      },
    });
    return contents;
  },
  schema: areaSchema,
});

const cafesCollection = defineCollection({
  loader: async () => {
    const { contents } = await microcmsClient.getList<unknown>({
      endpoint: "cafes",
      queries: {
        fields: "id,name,slug,image,area,address,schedule,host,contact",
        limit: 100, // 全部取得するために、最大値の100を指定
        offset: 0,
      },
    });
    return contents;
  },
  schema: cafeSchema,
});

export const collections = {
  areas: areasCollection,
  cafes: cafesCollection,
};
