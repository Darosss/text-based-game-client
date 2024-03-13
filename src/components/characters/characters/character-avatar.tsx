import { ItemType } from "@/api/enums";
import Image from "next/image";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { useCharacterManagementContext } from "./character-management-context";
import dndStyles from "../dnd.module.scss";
import { allowDropToPrefixes } from "../dndHelpers";
import {
  BaseDropResultsFromInventory,
  UseDropBaseCollectedProps,
} from "../dndTypes";
import { PossibleDropResultActions } from "../equipment";
import { FC } from "react";

export const CharacterAvatar: FC = () => {
  const {
    apiCharacter: {
      api: { data },
    },
  } = useCharacterManagementContext();

  const [{ canDrop, isOver }, drop] = useDrop<
    unknown,
    BaseDropResultsFromInventory,
    UseDropBaseCollectedProps
  >(
    () => ({
      accept: allowDropToPrefixes.equipmentAndMerchant + ItemType.CONSUMABLE,
      drop: () => ({
        dropAction: PossibleDropResultActions.CONSUME,
        characterId: data.id,
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
    <Image
      className={`${
        isActive ? dndStyles.active : canDrop ? dndStyles.canDrop : ""
      }`}
      ref={drop}
      src="/images/hero-placeholder.png"
      alt="hero img"
      sizes="(max-width: 768px) 33vw, (max-width: 1200px) 40vw, 50vw"
      fill
    />
  );
};
