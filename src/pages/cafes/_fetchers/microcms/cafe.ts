import { microcmsClient } from "../../../../libs/microcms";
import type { MicroCMSCafe } from "../../../../libs/microcms/types";
import { type Cafe, parseCafe } from "../../../../models/cafe";

function parseMicroCMSCafeToCafe(data: MicroCMSCafe): Cafe {
  return parseCafe({
    ...data,
    image: data.image
      ? {
          ...data.image,
          src: data.image.url,
        }
      : null,
    contact: data.contact ?? "",
  });
}

export async function fetchCafes(): Promise<Cafe[]> {
  const { contents } = await microcmsClient.getList<MicroCMSCafe>({
    endpoint: "cafes",
    queries: {
      fields: "id,name,slug,image,area,address,schedule,host,contact",
      limit: 100, // 全部取得するために、最大値の100を指定
      offset: 0,
    },
  });

  return contents.map(parseMicroCMSCafeToCafe);
}

export async function fetchCafesByAreaId(areaId: string): Promise<Cafe[]> {
  const { contents } = await microcmsClient.getList<MicroCMSCafe>({
    endpoint: "cafes",
    queries: {
      fields: "id,name,slug,image,area,address,schedule,host,contact",
      filters: `area[equals]${areaId}`,
      limit: 100, // 全部取得するために、最大値の100を指定
      offset: 0,
    },
  });

  return contents.map(parseMicroCMSCafeToCafe);
}
