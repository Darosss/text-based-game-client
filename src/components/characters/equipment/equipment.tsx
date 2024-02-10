import { Item } from "@/api/types";
import styles from "./equipment.module.scss";
import { CharacterEquipmentFields } from "@/api/enums";
import { useEffect, useState } from "react";
import { ItemTooltipContentWrapper } from "@/components/items/item-display";
import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { EquipmentItem } from "./equipment-item";
import { EmptyEquipmentSlot } from "./empty-equipment-slot";

type EquipmentProps = {};

type UnEquipParameters = {
  characterId: string;
  slot: CharacterEquipmentFields;
};

export const Equipment = ({}: EquipmentProps) => {
  const {
    apiCharacter: {
      api: { data: characterData },
      fetchData: fetchCharacterData,
    },
    apiInventory: { fetchData: fetchInventoryData },
  } = useCharacterManagementContext();
  const [unEquipParameters, setUnEquipParameters] =
    useState<UnEquipParameters | null>(null);

  const { api, fetchData } = useFetch<boolean>(
    {
      url: unEquipParameters
        ? `un-equip/${unEquipParameters.characterId}/${unEquipParameters.slot}`
        : "",
      method: "POST",
    },
    { manual: true }
  );
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {
    if (unEquipParameters && unEquipParameters.characterId) {
      fetchData().then(() => {
        fetchInventoryData();
        fetchCharacterData();
      });
    }
  }, [unEquipParameters, fetchData, fetchInventoryData, fetchCharacterData]);
  const tooltipId = "equipment-tooltip";

  if (!characterData) return <>No character. Fix later here</>;

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
                <div className={styles.equipedField}>
                  <EquipmentItem
                    currentField={eqField}
                    characterId={characterData.id}
                    item={currentSlot}
                    onHover={(item) => setCurrentItem(item)}
                    tooltipId={tooltipId}
                    onItemUnEquip={(characterId, slot) =>
                      setUnEquipParameters({
                        characterId,
                        slot,
                      })
                    }
                  />
                </div>
              ) : (
                <EmptyEquipmentSlot
                  equipmentField={eqField}
                  characterId={characterData.id}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
