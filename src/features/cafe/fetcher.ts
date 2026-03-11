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
      orders: "system:default", // microCMSの管理画面の「並び順」をそのまま反映
      limit: 100, // 全部取得するために、最大値の100を指定
      offset: 0,
    },
  });

  // ここでmicroCMSからのレスポンスをCafe型に変換する
  const result = microcmsCafeSchema.array().parse(contents);

  return result.map((cafe, index) => ({
    ...cafe,
    order: index + 1, // 取得した並び順をここで保持しておく（astroのgetCollectionで並び順がバラバラになってしまうから）
  }));
}
