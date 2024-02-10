import { CharacterEquipmentFields } from "@/api/enums";
import { Item } from "@/api/types";
import { ItemDisplay } from "@/components/items/item-display";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { EquipmentDropResult } from "../dndTypes";

type InventoryItemProps = {
  inventoryItem: [string, Item];
  tooltipId: string;
  onHover: (item: Item) => void;
  onItemEquip: (
    characterId: string,
    itemId: string,
    slotName: CharacterEquipmentFields
  ) => void;
};

export const InventoryItem = ({
  inventoryItem: [id, item],
  tooltipId,
  onHover,
  onItemEquip,
}: InventoryItemProps) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: item.type,
      item: { name: item.name, id: item.id },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as EquipmentDropResult;
        if (item && dropResult) {
          onItemEquip(dropResult.characterId, item.id, dropResult.name);
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
      tooltipId={tooltipId}
      onHover={(item) => onHover(item)}
      opacity={opacity}
    />
  );
};
