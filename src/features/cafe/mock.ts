import { randomUUID } from "node:crypto";
import type { Area, Cafe } from "./model";

const mukoArea = {
  id: "1",
  name: "武庫",
  slug: "muko",
  priority: 1,
} as const satisfies Area;

const tachibanaArea = {
  id: "2",
  name: "立花",
  slug: "tachibana",
  priority: 2,
} as const satisfies Area;

const sonodaArea = {
  id: "3",
  name: "園田",
  slug: "sonoda",
  priority: 3,
} as const satisfies Area;

const oshoArea = {
  id: "4",
  name: "大庄",
  slug: "osho",
  priority: 4,
} as const satisfies Area;

const chuoArea = {
  id: "5",
  name: "中央",
  slug: "chuo",
  priority: 5,
} as const satisfies Area;

const odaArea = {
  id: "6",
  name: "小田",
  slug: "oda",
  priority: 6,
} as const satisfies Area;

const mockAreas = {
  muko: mukoArea,
  tachibana: tachibanaArea,
  sonoda: sonodaArea,
  osho: oshoArea,
  chuo: chuoArea,
  oda: odaArea,
} as const;

export function getMockAreas(): Area[] {
  return Object.values(mockAreas);
}

function mockCafe(
  area: Area,
): (
  cafe: Pick<
    Cafe,
    "name" | "slug" | "image" | "address" | "schedule" | "host" | "contact"
  >,
) => Cafe {
  return (cafe) => ({
    id: randomUUID(),
    area,
    ...cafe,
  });
}

const mukoCafe = mockCafe(mockAreas.muko);
const tachibanaCafe = mockCafe(mockAreas.tachibana);
const sonodaCafe = mockCafe(mockAreas.sonoda);
const oshoCafe = mockCafe(mockAreas.osho);
const chuoCafe = mockCafe(mockAreas.chuo);
const odaCafe = mockCafe(mockAreas.oda);

export function getMockCafes(): Cafe[] {
  const cafes: Cafe[] = [];

  for (let i = 1; i <= 10; i++) {
    cafes.push(
      mukoCafe({
        name: `武庫の食堂${i}`,
        slug: `muko-cafe${randomUUID()}`,
        image: null,
        address: "尼崎市000-000-000",
        schedule: "毎週月曜日00~00",
        host: "田中太郎",
        contact: "000-0000-0000",
      }),
    );
    cafes.push(
      tachibanaCafe({
        name: `立花の食堂${i}`,
        slug: `tachibana-cafe${randomUUID()}`,
        image: null,
        address: "尼崎市000-000-000",
        schedule: "毎週月曜日00~00",
        host: "山田花子",
        contact: "000-0000-0000",
      }),
    );
    cafes.push(
      sonodaCafe({
        name: `園田の食堂${i}`,
        slug: `sonoda-cafe${randomUUID()}`,
        image: null,
        address: "尼崎市000-000-000",
        schedule: "毎週月曜日00~00",
        host: "佐藤次郎",
        contact: "000-0000-0000",
      }),
    );
    cafes.push(
      oshoCafe({
        name: `大庄の食堂${i}`,
        slug: `osho-cafe${randomUUID()}`,
        image: null,
        address: "尼崎市000-000-000",
        schedule: "毎週月曜日00~00",
        host: "中村三郎",
        contact: "000-0000-0000",
      }),
    );
    cafes.push(
      chuoCafe({
        name: `中央の食堂${i}`,
        slug: `chuo-cafe${randomUUID()}`,
        image: null,
        address: "尼崎市000-000-000",
        schedule: "毎週月曜日00~00",
        host: "鈴木四郎",
        contact: "000-0000-0000",
      }),
    );
    cafes.push(
      odaCafe({
        name: `小田の食堂${i}`,
        slug: `oda-cafe${randomUUID()}`,
        image: null,
        address: "尼崎市000-000-000",
        schedule: "毎週月曜日00~00",
        host: "伊藤五郎",
        contact: "000-0000-0000",
      }),
    );
  }

  return cafes;
}
