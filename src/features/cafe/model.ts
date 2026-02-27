import { z } from "astro/zod";

export const areaSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  priority: z.number(),
});

export type Area = z.infer<typeof areaSchema>;

export const microcmsCafeSchema = z
  .object({
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
  })
  .transform((cafe) => ({
    ...cafe,
    image: cafe.image
      ? {
          src: cafe.image.url,
          width: cafe.image.width,
          height: cafe.image.height,
        }
      : null,
    contact: cafe.contact ?? "", // contactがnullの場合は空文字を設定
  }));

// microCMSからのデータが都合が悪い部分のみ、必要な形に変換するためのschema
export const cafeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z
    .object({
      src: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .nullable(),
  area: areaSchema,
  address: z.string(),
  schedule: z.string(),
  host: z.string(),
  contact: z.string(),
});

export type Cafe = z.infer<typeof cafeSchema>;
