import { CharacterEquipmentFields, ItemType } from "@/api/enums";
import { InventoryItemType } from "@/api/types";
import { ItemDisplay } from "@/components/items/item-display";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { EquipmentDropResult } from "../dndTypes";

type InventoryItemProps = {
  inventoryItem: [string, InventoryItemType];
  tooltipId: string;
  onHover: (item: InventoryItemType) => void;
  onItemEquip: (
    characterId: string,
    itemId: string,
    slotName: CharacterEquipmentFields
  ) => void;
  onItemConsume: (itemId: string) => void;
  onMercenaryWear: (characterId: string, itemId: string) => void;
};

export const InventoryItem = ({
  inventoryItem: [id, item],
  tooltipId,
  onHover,
  onItemEquip,
  onItemConsume,
  onMercenaryWear,
}: InventoryItemProps) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: item.type,
      item: { name: item.name, id: item.id, type: item.type },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as EquipmentDropResult;
        if (item && dropResult) {
          switch (item.type) {
            case ItemType.CONSUMABLE:
              onItemConsume(item.id);
              break;
            case ItemType.MERCENARY:
              onMercenaryWear(dropResult.characterId, item.id);
              break;
            default:
              onItemEquip(dropResult.characterId, item.id, dropResult.name);
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
