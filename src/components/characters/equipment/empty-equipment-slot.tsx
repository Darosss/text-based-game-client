import { CharacterEquipmentFields } from "@/api/enums";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { equipmentFieldToItemType } from "./slot-mapping";
import styles from "./equipment.module.scss";
import dndStyles from "../dnd.module.scss";
import { useInventoryControlContext } from "../inventory/inventory-control-context";
import Image from "next/image";

type EmptyEquipmentSlotProps = {
  equipmentField: CharacterEquipmentFields;
  characterId: string;
};

export const EmptyEquipmentSlot = ({
  equipmentField,
  characterId,
}: EmptyEquipmentSlotProps) => {
  const { setFilter } = useInventoryControlContext();
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
    [characterId, equipmentField]
  );
  const isActive = canDrop && isOver;
  return (
    <div
      ref={drop}
      className={`${styles.emptyEquipmentSlot} ${
        isActive ? dndStyles.active : canDrop ? dndStyles.canDrop : ""
      }`}
      onClick={() =>
        setFilter((prevState) => ({
          ...prevState,
          showType: equipmentFieldToItemType[equipmentField],
        }))
      }
    >
      <Image
        alt={equipmentField}
        src={`/images/equipment/${equipmentField}.png`}
        sizes="(max-width: 768px) 15vw, (max-width: 1200px) 22vw, 25vw"
        fill
      />
    </div>
  );
};
