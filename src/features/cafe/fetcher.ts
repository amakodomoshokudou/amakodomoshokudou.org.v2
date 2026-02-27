import { microcmsClient } from "../../libs/microcms";
import { type Area, areaSchema, type Cafe, microcmsCafeSchema } from "./model";

export async function fetchAllAreas(): Promise<Area[]> {
  const { contents } = await microcmsClient.getList<unknown>({
    endpoint: "areas",
    queries: {
      fields: "id,name,slug,priority",
      orders: "priority",
      limit: 100, // 全部取得するために、最大値の100を指定
      offset: 0,
    },
  });
  return areaSchema.array().parse(contents);
}

export async function fetchAllCafes(): Promise<Cafe[]> {
  const { contents } = await microcmsClient.getList<unknown>({
    endpoint: "cafes",
    queries: {
      fields: "id,name,slug,image,area,address,schedule,host,contact",
      limit: 100, // 全部取得するために、最大値の100を指定
      offset: 0,
    },
  });
  // ここでmicroCMSからのレスポンスをCafe型に変換する
  return microcmsCafeSchema.array().parse(contents);
}
