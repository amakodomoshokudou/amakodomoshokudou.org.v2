import { defineCollection } from "astro:content";
import { fetchAllAreas, fetchAllCafes } from "./features/cafe/fetcher";
import { getMockAreas, getMockCafes } from "./features/cafe/mock";
import { type Area, areaSchema, type Cafe, cafeSchema } from "./features/cafe/model";

// モードの切り替えは環境変数 MODE で行う(astro sync / astro check は --mode を受け付けないため)。
// production 以外は mock データを使う。
const isMockMode = process.env.MODE !== "production";

const areasCollection = defineCollection({
  loader: async (): Promise<Area[]> => {
    return isMockMode ? getMockAreas() : await fetchAllAreas();
  },
  schema: areaSchema,
});

const cafesCollection = defineCollection({
  loader: async (): Promise<Cafe[]> => {
    return isMockMode ? getMockCafes() : await fetchAllCafes();
  },
  schema: cafeSchema,
});

export const collections = {
  areas: areasCollection,
  cafes: cafesCollection,
};
