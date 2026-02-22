import { microcmsClient } from "../../../../libs/microcms";
import type { MicroCMSArea } from "../../../../libs/microcms/types";
import { type Area, parseArea } from "../../../../models/area";

export async function fetchAreas(): Promise<Area[]> {
  const { contents } = await microcmsClient.getList<MicroCMSArea>({
    endpoint: "areas",
    queries: {
      fields: "id,name,slug,priority",
      orders: "priority",
      limit: 100, // 全部取得するために、最大値の100を指定
      offset: 0,
    },
  });

  return contents.map(parseArea);
}
