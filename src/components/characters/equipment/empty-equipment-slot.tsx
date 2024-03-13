import { CharacterEquipmentFields } from "@/api/enums";
import { useDrop, DropTargetMonitor } from "react-dnd";
import { equipmentFieldToItemType } from "./slot-mapping";
import styles from "./equipment.module.scss";
import dndStyles from "../dnd.module.scss";
import { useInventoryControlContext } from "../inventory";
import Image from "next/image";
import { allowDropToPrefixes } from "../dndHelpers";
import {
  BaseEquipmentFieldDropResult,
  UseDropBaseCollectedProps,
} from "../dndTypes";
import { PossibleDropResultActions } from "./enums";
import { FC } from "react";

type EmptyEquipmentSlotProps = {
  equipmentField: CharacterEquipmentFields;
  characterId: string;
};

export const EmptyEquipmentSlot: FC<EmptyEquipmentSlotProps> = ({
  equipmentField,
  characterId,
}) => {
  const { setFilter } = useInventoryControlContext();
  const [{ canDrop, isOver }, drop] = useDrop<
    unknown,
    BaseEquipmentFieldDropResult,
    UseDropBaseCollectedProps
  >(
    () => ({
      accept: equipmentFieldToItemType[equipmentField].map(
        (val) => allowDropToPrefixes.equipmentAndMerchant + val
      ),
      drop: () => ({
        dropAction: PossibleDropResultActions.EQUIP_ITEM,
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
        src={`/images/equipment/${
          !equipmentField.includes("RING") ? equipmentField : "ring"
        }.png`}
        sizes="(max-width: 768px) 15vw, (max-width: 1200px) 25vw, 33vw"
        fill
      />
    </div>
  );
};
