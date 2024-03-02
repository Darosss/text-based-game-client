"use client";

import styles from "./inventory.module.scss";
import dndStyles from "../dnd.module.scss";
import { InventoryItems } from "./inventory-items";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemType } from "@/api/enums";
import { dropAcceptTypePrefix } from "../dndHelpers";
import { InventoryMenu } from "./inventory-menu";
import { InventorySidebar } from "./inventory-sidebar";
import { Inventory as InventoryType } from "@/api/types";

type InventoryProps = {
  data: InventoryType;
};

export const Inventory = ({ data }: InventoryProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: Object.values(ItemType).map((val) => dropAcceptTypePrefix + val),
      drop: () => ({}),
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    ["any"]
  );
  if (!data) return <></>;
  const isActive = canDrop && isOver;
  return (
    <div
      className={`${styles.inventoryWrapper} ${
        isActive ? dndStyles.active : canDrop ? dndStyles.canDrop : ""
      }`}
      ref={drop}
    >
      <div className={styles.inventoryMenu}>
        <InventoryMenu />
      </div>
      <div className={styles.inventoryBottom}>
        <div className={styles.inventoryItems}>
          {data.items ? (
            <InventoryItems
              items={data.items}
              tooltipId="inventory-item-tooltip"
            />
          ) : null}
        </div>
        <div className={styles.sidebar}>
          <InventorySidebar />
        </div>
      </div>
    </div>
  );
};
