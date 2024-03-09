import { ItemType } from "@/api/enums";
import { Item } from "@/api/types";

export type FilterType = {
  showType: ItemType[];
  name: string | null;
};

export type SortType = {
  descending: boolean;
  sortBy: SortByKeysType;
};

export type SortByKeysType = keyof Pick<
  Item,
  "level" | "name" | "type" | "value" | "upgradePoints" | "weight"
>;
