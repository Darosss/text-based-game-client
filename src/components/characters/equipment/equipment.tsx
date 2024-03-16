import React from "react";
import styles from "./equipment.module.scss";
import { InventoryItemType, UnEquipResponseType } from "@/api/types";
import { CharacterEquipmentFields } from "@/api/enums";
import { FC, useState } from "react";
import { ItemTooltipContentWrapper } from "@/components/items";
import { useCharacterManagementContext } from "@/components/characters";
import { EquipmentItem } from "./equipment-item";
import { EmptyEquipmentSlot } from "./empty-equipment-slot";
import { isMercenaryCharacter } from "@/api/utils";
import { MercenaryItemField } from "./mercenary-item-field";
import { HeroSelect } from "./hero-select";
import { fetchBackendApi } from "@/api/fetch";

export const Equipment: FC = () => {
  const tooltipId = "equipment-tooltip";

  const {
    apiCharacter: {
      api: { data: characterData, message },
      fetchData: fetchCharacterData,
    },
    apiInventory: { fetchData: fetchInventoryData },
  } = useCharacterManagementContext();

  const [currentItem, setCurrentItem] = useState<InventoryItemType | null>(
    null
  );

  const handleOnItemUnEquip = (
    characterId: string,
    slot: CharacterEquipmentFields
  ) => {
    fetchBackendApi<UnEquipResponseType>({
      url: `characters/un-equip/${characterId}/${slot}`,
      method: "POST",
      notification: { pendingText: "Trying to un wear an item..." },
    }).then(() => {
      fetchInventoryData();
      fetchCharacterData();
    });
  };

  return (
    <div className={styles.equipmentWrapper}>
      <ItemTooltipContentWrapper
        customClassName={styles.equipmentTooltip}
        item={currentItem}
        tooltipId={tooltipId}
      />

      <div className={styles.equipmentContainer}>
        {Object.values(CharacterEquipmentFields).map((eqField) => {
          const currentSlot = characterData.equipment.slots[eqField];
          return (
            <div key={eqField} className={styles[eqField.toLowerCase()]}>
              <div className={styles.background}></div>

              {currentSlot ? (
                <EquipmentItem
                  currentField={eqField}
                  characterId={characterData.id}
                  item={currentSlot}
                  onHover={(item) => setCurrentItem(item)}
                  tooltipId={tooltipId}
                  onItemUnEquip={(characterId, slot) =>
                    handleOnItemUnEquip(characterId, slot)
                  }
                />
              ) : (
                <EmptyEquipmentSlot
                  equipmentField={eqField}
                  characterId={characterData.id}
                />
              )}
            </div>
          );
        })}
        <div className={styles.heroSelect}>
          <HeroSelect />
        </div>
        {isMercenaryCharacter(characterData) ? (
          <div className={styles.mercenaryItem}>
            <MercenaryItemField
              characterId={characterData.id}
              mercenaryItem={characterData.mercenary}
              onHover={(item) => setCurrentItem(item)}
              tooltipId={tooltipId}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
