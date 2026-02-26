import * as v from "valibot";
import { areaSchema } from "../area";

export const cafeSchema = v.object({
  id: v.string(),
  name: v.string(),
  slug: v.string(),
  image: v.nullable(
    v.object({
      src: v.string(),
      width: v.number(),
      height: v.number(),
    }),
  ),
  area: areaSchema,
  address: v.string(),
  schedule: v.string(),
  host: v.string(),
  contact: v.string(),
});

export type Cafe = v.InferOutput<typeof cafeSchema>;
