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
import {
  DragBaseCollectedProps,
  DropDragObjectIntoInventory,
  DropResultAsMercenaryItem,
  MercenaryEquipmentFieldDropResult,
  UseDropBaseCollectedProps,
} from "../dndTypes";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { useInventoryControlContext } from "../inventory/inventory-control-context";
import Image from "next/image";
import { fetchBackendApi } from "@/api/fetch";
import { allowDropToPrefixes } from "../dndHelpers";
import { PossibleDropResultActions } from "./enums";

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

  const [{ canDrop, isOver }, drop] = useDrop<
    unknown,
    MercenaryEquipmentFieldDropResult,
    UseDropBaseCollectedProps
  >(
    () => ({
      accept: allowDropToPrefixes.equipmentAndMerchant + ItemType.MERCENARY,
      drop: () => ({
        dropAction: PossibleDropResultActions.EQUIP_MERCENARY,
        characterId,
      }),
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [characterId]
  );

  const [{ opacity }, drag] = useDrag<
    DropDragObjectIntoInventory,
    DropResultAsMercenaryItem,
    DragBaseCollectedProps
  >(
    () => ({
      type: allowDropToPrefixes.inventory + mercenaryItem?.type,
      item: {
        name: mercenaryItem?.name || "No mercenary",
        id: mercenaryItem?.id || "No id mercenary",
        dropAction: PossibleDropResultActions.UN_EQUIP_MERCENARY,
      },
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (
          item &&
          dropResult?.dropAction ===
            PossibleDropResultActions.UN_EQUIP_MERCENARY
        ) {
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
      url: `characters/un-equip-mercenary/${characterId}`,
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
          opacity={opacity}
        />
      ) : (
        <Image
          alt={ItemType.MERCENARY}
          src={`/images/equipment/${ItemType.MERCENARY.toString().toLowerCase()}.png`}
          sizes="(max-width: 768px) 15vw, (max-width: 1200px) 25vw, 33vw"
          fill
        />
      )}
    </div>
  );
};
