import {
  Item,
  InventoryItems as InventoryItemsType,
  EquipResponseType,
} from "@/api/types";
import { useMemo, useState } from "react";
import { ItemTooltipContentWrapper } from "../../items/item-display";
import styles from "./inventory-items.module.scss";
import { useFetch } from "@/hooks/useFetch";
import { CharacterEquipmentFields } from "@/api/enums";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { InventoryItem } from "./inventory-item";
import {
  InventoryControlContext,
  SortByType,
  useInventoryControlContext,
} from "./inventory-control-context";
import { toast } from "react-toastify";

type InventoryItemsProps = {
  items: InventoryItemsType;
  tooltipId: string;
  //TODO: move this to conetxt probably;
};

type EquipParameters = {
  characterId: string;
  itemId: string;
  slot: CharacterEquipmentFields;
};

const filterItemsEntries = (
  items: InventoryItemsType,
  filter: InventoryControlContext
) => {
  return Object.entries(items).filter(([_, itemToFilter]) => {
    const { showType, name } = filter;
    let itemFiltered = true;
    if (showType)
      itemFiltered =
        showType.length === 0 ? true : showType.includes(itemToFilter.type);
    if (name && itemFiltered)
      itemFiltered = itemToFilter.nameWithPrefixAndSuffix
        .toLowerCase()
        .includes(name);
    return itemFiltered;
  });
};
const getSortedItems = (items: [string, Item][], sort: SortByType) => {
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

export const InventoryItems = ({ items, tooltipId }: InventoryItemsProps) => {
  const { filter, sort } = useInventoryControlContext();
  const {
    apiCharacter: { fetchData: fetchCharacterData },
    apiInventory: { fetchData: fetchInventoryData },
  } = useCharacterManagementContext();

  const {
    api: { isPending, error, data },
    fetchData,
  } = useFetch<EquipResponseType | boolean>(
    //Note: temporary solution
    { url: "", method: "POST" },
    { manual: true }
  );

  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const itemsToRender = useMemo(
    () => getSortedItems(filterItemsEntries(items, filter), sort),
    [items, filter, sort]
  );

  const handleOnItemConusme = (itemId: string) => {
    const toastId = toast.loading("Trying to use item...", {
      autoClose: 30000,
    });
    fetchData({
      customUrl: `use-consumable/${itemId}`,
    }).then((response) => {
      fetchCharacterData();
      fetchInventoryData();
      if (typeof response === "boolean")
        //TODO: make better descriptions from backend
        toast.update(toastId, {
          render: response ? "Used item" : "Cannot use item",
          type: response ? "success" : "error",
          isLoading: false,
          autoClose: 2000,
        });
    });
  };

  const handleOnItemEquip = (
    characterId: string,
    itemId: string,
    slot: CharacterEquipmentFields
  ) => {
    const toastId = toast.loading("Trying to wear item...", {
      autoClose: 30000,
    });
    fetchData({
      customUrl: `equip/${characterId}/${itemId}/${slot}`,
    }).then((response) => {
      fetchCharacterData();
      fetchInventoryData();
      if (response && typeof response !== "boolean")
        toast.update(toastId, {
          render: response?.message,
          type: response.success ? "success" : "error",
          isLoading: false,
          autoClose: 2000,
        });
    });
  };

  return (
    <div className={styles.itemsWrapper}>
      <ItemTooltipContentWrapper
        customClassName={styles.inventoryTooltip}
        item={currentItem}
        tooltipId={tooltipId}
      />
      {itemsToRender.map((val) => (
        <div key={val[0]} className={styles.oneItemWrapper}>
          <InventoryItem
            key={val[0]}
            inventoryItem={val}
            tooltipId={tooltipId}
            onHover={(item) => setCurrentItem(item)}
            onItemEquip={(characterId, itemId, slot) =>
              handleOnItemEquip(characterId, itemId, slot)
            }
            onItemConsume={(itemId) => handleOnItemConusme(itemId)}
          />
        </div>
      ))}
    </div>
  );
};
