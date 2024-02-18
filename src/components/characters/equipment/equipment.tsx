import { InventoryItemType, UnEquipResponseType } from "@/api/types";
import styles from "./equipment.module.scss";
import { CharacterEquipmentFields } from "@/api/enums";
import { useEffect, useState } from "react";
import { ItemTooltipContentWrapper } from "@/components/items/item-display";
import React from "react";
import { useFetch } from "@/hooks/useFetch";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { EquipmentItem } from "./equipment-item";
import { EmptyEquipmentSlot } from "./empty-equipment-slot";
import { toast } from "react-toastify";
import { isMercenaryCharacter } from "@/api/utils";
import { MercenaryItemField } from "./mercenary-item-field";
import { HeroSelect } from "./hero-select";

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

  const { api, fetchData } = useFetch<UnEquipResponseType>(
    {
      url: unEquipParameters
        ? `un-equip/${unEquipParameters.characterId}/${unEquipParameters.slot}`
        : "",
      method: "POST",
    },
    { manual: true }
  );
  const [currentItem, setCurrentItem] = useState<InventoryItemType | null>(
    null
  );

  useEffect(() => {
    if (unEquipParameters && unEquipParameters.characterId) {
      const toastId = toast.loading("Trying to take off item...", {
        autoClose: 30000,
      });
      fetchData().then((response) => {
        fetchInventoryData();
        fetchCharacterData();
        if (response)
          toast.update(toastId, {
            render: response?.message,
            type: response.success ? "success" : "error",
            isLoading: false,
            autoClose: 2000,
          });
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
