import { CharacterEquipmentFields, ItemType } from "@/api/enums";
import { InventoryItemType } from "@/api/types";
import { ItemDisplay } from "@/components/items/item-display";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { BaseDropResult, EquipmentDropResult } from "../dndTypes";
import { allowDropToPrefixes, isEquipmentDropResult } from "../dndHelpers";

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
  onItemSell: (itemId: string) => void;
};

export const InventoryItem = ({
  inventoryItem: [id, item],
  tooltipId,
  onHover,
  onItemEquip,
  onItemConsume,
  onMercenaryWear,
  onItemSell,
}: InventoryItemProps) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: allowDropToPrefixes.equipmentAndMerchant + item.type,
      item: { name: item.name, id: item.id, type: item.type },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as
          | BaseDropResult
          | EquipmentDropResult;
        if (isEquipmentDropResult(dropResult)) {
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
        } else {
          onItemSell(item.id);
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
