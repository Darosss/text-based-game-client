import { CharacterEquipment, Item } from "@/api/types";
import styles from "./equipment.module.scss";
import { CharacterEquipmentFields } from "@/api/enums";
import { ItemDisplay } from "@/components/items/item-display";
import { useState } from "react";
import { ItemTooltipContentWrapper } from "@/components/items/item-display";

type EquipmentProps = {
  equipment: CharacterEquipment;
};

export const Equipment = ({ equipment }: EquipmentProps) => {
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const tooltipId = "equipment-tooltip";
  return (
    <div className={styles.equipmentWrapper}>
      <ItemTooltipContentWrapper item={currentItem} tooltipId={tooltipId} />

      <div className={styles.equipmentContainer}>
        {Object.values(CharacterEquipmentFields).map((val, index) => {
          const currentSlot = equipment.slots[val];
          return (
            <div key={index} className={styles[val.toLowerCase()]}>
              {currentSlot ? (
                <ItemDisplay
                  item={currentSlot}
                  onHover={(item) => setCurrentItem(item)}
                  tooltipId={tooltipId}
                />
              ) : (
                val
              )}
              {/* TOOD: later add images palceholders */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
