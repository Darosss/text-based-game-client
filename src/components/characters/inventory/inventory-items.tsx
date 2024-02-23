import {
  InventoryItems as InventoryItemsType,
  EquipResponseType,
  InventoryItemType,
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
import { isWearableItem } from "@/api/utils";
import { fetchBackendApi } from "@/api/fetch";

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
const getSortedItems = (
  items: [string, InventoryItemType][],
  sort: SortByType
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

export const InventoryItems = ({ items, tooltipId }: InventoryItemsProps) => {
  const { filter, sort } = useInventoryControlContext();
  const {
    apiCharacter: { fetchData: fetchCharacterData },
    apiInventory: { fetchData: fetchInventoryData },
  } = useCharacterManagementContext();

  const {
    api: {
      isPending,
      error,
      responseData: { data },
    },
    fetchData,
  } = useFetch<EquipResponseType | boolean>(
    //TODO: change. Note: temporary solution
    { url: "", method: "POST" },
    { manual: true }
  );

  const [currentItem, setCurrentItem] = useState<InventoryItemType | null>(
    null
  );

  const itemsToRender = useMemo(
    () => getSortedItems(filterItemsEntries(items, filter), sort),
    [items, filter, sort]
  );

  const handleOnItemConusme = (itemId: string) => {
    fetchBackendApi<boolean>({
      url: `use-consumable/${itemId}`,
      method: "POST",
      notification: { pendingText: "Trying to use consumable item...." },
    }).then(() => {
      fetchCharacterData();
      fetchInventoryData();
    });
  };

  const handleOnItemEquip = (
    characterId: string,
    itemId: string,
    slot: CharacterEquipmentFields
  ) => {
    fetchBackendApi<EquipResponseType>({
      url: `equip/${characterId}/${itemId}/${slot}`,
      method: "POST",
      notification: { pendingText: "Trying to wear item..." },
    }).then(() => {
      fetchInventoryData();
      fetchCharacterData({ customUrl: `characters/${characterId}` });
    });
  };

  const handleOnMercenaryWear = (characterId: string, itemId: string) => {
    fetchBackendApi<EquipResponseType>({
      url: `equip-mercenary/${characterId}/${itemId}`,
      method: "POST",
      notification: { pendingText: "Trying to equip mercenary..." },
    }).then(() => {
      fetchInventoryData();
      fetchCharacterData({ customUrl: `characters/${characterId}` });
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
            onMercenaryWear={(characterId, itemId) =>
              handleOnMercenaryWear(characterId, itemId)
            }
          />
        </div>
      ))}
    </div>
  );
};
