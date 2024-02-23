import { ItemType } from "@/api/enums";
import {
  DragSourceMonitor,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from "react-dnd";
import dndStyles from "../dnd.module.scss";
import styles from "./equipment.module.scss";
import {
  InventoryItemType,
  ItemMercenary,
  UnEquipResponseType,
} from "@/api/types";
import { ItemDisplay } from "@/components/items/item-display";
import { dropAcceptTypePrefix } from "../dndHelpers";
import { InventoryDropResult } from "../dndTypes";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { useInventoryControlContext } from "../inventory/inventory-control-context";
import Image from "next/image";
import { fetchBackendApi } from "@/api/fetch";

type MercenaryItemFieldProps = {
  characterId: string;
  mercenaryItem?: ItemMercenary;
  onHover: (item: InventoryItemType) => void;
  tooltipId: string;
};

export const MercenaryItemField = ({
  characterId,
  mercenaryItem,
  onHover,
  tooltipId,
}: MercenaryItemFieldProps) => {
  const {
    apiCharacter: { fetchData: fetchCharacterData },
    apiInventory: { fetchData: fetchInventoryData },
  } = useCharacterManagementContext();

  const { setFilter } = useInventoryControlContext();

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ItemType.MERCENARY,
      drop: () => ({ characterId }),
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [characterId]
  );

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: dropAcceptTypePrefix + mercenaryItem?.type,
      item: { name: mercenaryItem?.name, id: mercenaryItem?.id },
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as InventoryDropResult;
        if (item && dropResult) {
          onUnEquipMercenary();
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [mercenaryItem]
  );

  const onUnEquipMercenary = () => {
    fetchBackendApi<UnEquipResponseType>({
      url: `un-equip-mercenary/${characterId}`,
      method: "POST",
      notification: { pendingText: "Trying to un equip mercenary..." },
    }).then(() => {
      fetchInventoryData();
      fetchCharacterData({ customUrl: `characters/${characterId}` });
    });
  };

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
          showType: [ItemType.MERCENARY],
        }))
      }
    >
      <div className={styles.background}></div>
      {mercenaryItem ? (
        <ItemDisplay
          refForWrapper={drag}
          item={mercenaryItem}
          onHover={(item) => onHover(item)}
          tooltipId={tooltipId}
        />
      ) : (
        <Image
          alt={ItemType.MERCENARY}
          src={`/images/equipment/${ItemType.MERCENARY.toString().toLowerCase()}.png`}
          sizes="(max-width: 768px) 15vw, (max-width: 1200px) 22vw, 25vw"
          fill
        />
      )}
    </div>
  );
};
