import { CharacterEquipmentFields } from "@/api/enums";
import { InventoryItemType } from "@/api/types";
import { ItemDisplay } from "@/components/items/item-display";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { allowDropToPrefixes } from "../dndHelpers";
import {
  DragBaseCollectedProps,
  DropDragObjectIntoInventory,
  DropResultAsEquipmentItem,
} from "../dndTypes";
import { PossibleDropResultActions } from "./enums";

type EquipmentItemProps = {
  currentField: CharacterEquipmentFields;
  characterId: string;
  item: InventoryItemType;
  onHover: (item: InventoryItemType) => void;
  tooltipId: string;
  onItemUnEquip: (
    characterId: string,
    slotName: CharacterEquipmentFields
  ) => void;
};

export const EquipmentItem = ({
  item,
  onHover,
  tooltipId,
  onItemUnEquip,
  characterId,
  currentField,
}: EquipmentItemProps) => {
  const [{ opacity }, drag] = useDrag<
    DropDragObjectIntoInventory,
    DropResultAsEquipmentItem,
    DragBaseCollectedProps
  >(
    () => ({
      type: allowDropToPrefixes.inventory + item.type,
      item: {
        name: item.name,
        id: item.id,
        dropAction: PossibleDropResultActions.UN_EQUIP_ITEM,
      },
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (
          item &&
          dropResult?.dropAction === PossibleDropResultActions.UN_EQUIP_ITEM
        ) {
          onItemUnEquip(characterId, currentField);
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [item]
  );
  return (
    <ItemDisplay
      refForWrapper={drag}
      item={item}
      onHover={(item) => onHover(item)}
      tooltipId={tooltipId}
      opacity={opacity}
    />
  );
};
