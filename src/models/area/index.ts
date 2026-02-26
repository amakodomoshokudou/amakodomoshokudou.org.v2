import * as v from "valibot";

export const areaSchema = v.object({
  id: v.string(),
  name: v.string(),
  slug: v.string(),
  priority: v.number(),
});

export type Area = v.InferOutput<typeof areaSchema>;
