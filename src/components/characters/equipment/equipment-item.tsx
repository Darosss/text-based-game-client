import { CharacterEquipmentFields } from "@/api/enums";
import { InventoryItemType } from "@/api/types";
import { ItemDisplay } from "@/components/items/item-display";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { dropAcceptTypePrefix } from "../dndHelpers";
import { InventoryDropResult } from "../dndTypes";

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
  const [{ opacity }, drag] = useDrag(
    () => ({
      type: dropAcceptTypePrefix + item.type,
      item: { name: item.name, id: item.id },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as InventoryDropResult;
        if (item && dropResult) {
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
    />
  );
};
