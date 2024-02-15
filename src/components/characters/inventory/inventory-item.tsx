import { CharacterEquipmentFields, ItemType } from "@/api/enums";
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
  onItemConsume: (itemId: string) => void;
};

export const InventoryItem = ({
  inventoryItem: [id, item],
  tooltipId,
  onHover,
  onItemEquip,
  onItemConsume,
}: InventoryItemProps) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: item.type,
      item: { name: item.name, id: item.id, type: item.type },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as EquipmentDropResult;
        if (item && dropResult) {
          if (item.type !== ItemType.CONSUMABLE) {
            onItemEquip(dropResult.characterId, item.id, dropResult.name);
          } else {
            onItemConsume(item.id);
          }
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
