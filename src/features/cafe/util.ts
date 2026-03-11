import type { Area, Cafe } from "./model";

export function sortAreas(areas: Area[]): Area[] {
  // priorityの昇順 例: [1, 2, 3, 4, 5, 6]
  return areas.toSorted((a, b) => a.priority - b.priority);
}

export function sortCafes(cafes: Cafe[]): Cafe[] {
  // orderの昇順 例: [1, 2, 3, 4, 5, 6]
  return cafes.toSorted((a, b) => a.order - b.order);
}
