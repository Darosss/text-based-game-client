import { InventoryItemType } from "@/api/types";
import { DragSourceMonitor, useDrag } from "react-dnd";
import {
  DragBaseCollectedProps,
  DropDragObjectIntoInventory,
  DropResultAsMerchantItem,
} from "../dndTypes";
import { ItemDisplay } from "@/components/items/item-display";
import styles from "./merchant.module.scss";
import { useUserContext } from "@/components/user/user-context";
import { allowDropToPrefixes } from "../dndHelpers";
import { PossibleDropResultActions } from "../equipment/enums";

type MerchantItemData = {
  item: InventoryItemType;
  cost: number;
};

type MerchantItemsProps = {
  itemData: MerchantItemData;
  tooltipId: string;
  onHover: (item: InventoryItemType) => void;
  onItemBuy: (id: string, cost: number) => void;
};

export const MerchantItem = ({
  itemData: { item, cost },
  tooltipId,
  onHover,
  onItemBuy,
}: MerchantItemsProps) => {
  const [{ opacity }, drag] = useDrag<
    DropDragObjectIntoInventory,
    DropResultAsMerchantItem,
    DragBaseCollectedProps
  >(
    () => ({
      type: allowDropToPrefixes.inventory + item.type,
      item: {
        name: item.name,
        id: item.id,
        dropAction: PossibleDropResultActions.BUY_ITEM,
      },
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (
          item &&
          dropResult?.dropAction === PossibleDropResultActions.BUY_ITEM
        ) {
          onItemBuy(item.id, cost);
        }
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [item, cost]
  );
  const {
    apiUser: {
      api: {
        data: { gold },
      },
    },
  } = useUserContext();

  return (
    <div className={styles.oneItemWrapper}>
      <ItemDisplay
        refForWrapper={drag}
        item={item}
        costOptions={{
          canAfford: cost <= gold,
          value: cost,
        }}
        tooltipId={tooltipId}
        onHover={(item) => {
          onHover(item);
        }}
        opacity={opacity}
      />
    </div>
  );
};