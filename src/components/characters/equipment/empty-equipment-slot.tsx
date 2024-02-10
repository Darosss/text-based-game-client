import { CharacterEquipmentFields } from "@/api/enums";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { equipmentFieldToItemType } from "./slot-mapping";
import styles from "./equipment.module.scss";
import dndStyles from "../dnd.module.scss";

type EmptyEquipmentSlotProps = {
  equipmentField: CharacterEquipmentFields;
  characterId: string;
};

export const EmptyEquipmentSlot = ({
  equipmentField,
  characterId,
}: EmptyEquipmentSlotProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: equipmentFieldToItemType[equipmentField],
      drop: () => ({
        characterId,
        name: equipmentField,
      }),
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    ["any"]
  );
  const isActive = canDrop && isOver;
  return (
    <div
      ref={drop}
      className={`${styles.emptyEquipmentSlot} ${
        isActive ? dndStyles.active : canDrop ? dndStyles.canDrop : ""
      }`}
    >
      {equipmentField}
    </div>
  );
};
