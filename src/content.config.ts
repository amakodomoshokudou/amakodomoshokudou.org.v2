import { defineCollection } from "astro:content";
import { fetchAllAreas, fetchAllCafes } from "./features/cafe/fetcher";
import { getMockAreas, getMockCafes } from "./features/cafe/mock";
import {
  type Area,
  areaSchema,
  type Cafe,
  cafeSchema,
} from "./features/cafe/model";

const isMockMode = import.meta.env.MODE === "mock";

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
