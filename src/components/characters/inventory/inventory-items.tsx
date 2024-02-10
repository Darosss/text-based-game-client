import { Item, InventoryItems as InventoryItemsType } from "@/api/types";
import { useEffect, useState } from "react";
import { ItemTooltipContentWrapper } from "../../items/item-display";
import styles from "./inventory-items.module.scss";
import { useFetch } from "@/hooks/useFetch";
import { CharacterEquipmentFields } from "@/api/enums";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { InventoryItem } from "./inventory-item";

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

export const InventoryItems = ({ items, tooltipId }: InventoryItemsProps) => {
  const {
    apiCharacter: { fetchData: fetchCharacterData },
    apiInventory: { fetchData: fetchInventoryData },
  } = useCharacterManagementContext();
  const [equipParameters, setEquipParameters] =
    useState<EquipParameters | null>(null);
  const {
    api: { isPending, error, data },
    fetchData,
  } = useFetch<boolean>(
    {
      url: equipParameters
        ? `equip/${equipParameters.characterId}/${equipParameters.itemId}/${equipParameters.slot}`
        : "",
      method: "POST",
    },
    { manual: true }
  );

  useEffect(() => {
    if (
      equipParameters &&
      equipParameters.characterId &&
      equipParameters.itemId
    ) {
      fetchData().then(() => {
        fetchCharacterData();
        fetchInventoryData();
      });
    }
  }, [equipParameters, fetchCharacterData, fetchData, fetchInventoryData]);

  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  return (
    <div className={styles.itemsWrapper}>
      <ItemTooltipContentWrapper
        customClassName={styles.inventoryTooltip}
        item={currentItem}
        tooltipId={tooltipId}
      />
      {Object.entries(items).map((val) => (
        <div key={val[0]} className={styles.oneItemWrapper}>
          <InventoryItem
            key={val[0]}
            inventoryItem={val}
            tooltipId={tooltipId}
            onHover={(item) => setCurrentItem(item)}
            onItemEquip={(characterId, itemId, slot) =>
              setEquipParameters({
                characterId,
                itemId,
                slot,
              })
            }
          />
        </div>
      ))}
    </div>
  );
};
