import { InventoryItemType, InventoryItems } from "@/api/types";
import { isWearableItem } from "@/api/utils";
import { FilterType, SortType } from "./types";

export const filterItemsEntries = (
  items: InventoryItems,
  filter: FilterType
) => {
  return Object.entries(items).filter(([_, itemToFilter]) => {
    const { showType, name } = filter;
    let itemFiltered = true;
    if (showType)
      itemFiltered =
        showType.length === 0 ? true : showType.includes(itemToFilter.type);
    if (name && itemFiltered)
      itemFiltered = (
        isWearableItem(itemToFilter)
          ? itemToFilter.nameWithPrefixAndSuffix
          : itemToFilter.name
      )
        .toLowerCase()
        .includes(name);
    return itemFiltered;
  });
};
export const getSortedItems = (
  items: [string, InventoryItemType][],
  sort: SortType
) => {
  const sortedItems = items.sort(([, itemA], [, itemB]) => {
    if (itemA[sort.sortBy] < itemB[sort.sortBy]) {
      return -1;
    }
    if (itemA[sort.sortBy] > itemB[sort.sortBy]) {
      return 1;
    }
    return 0;
  });

  if (sort.descending) return sortedItems.reverse();
  return sortedItems;
};
