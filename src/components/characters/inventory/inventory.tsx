"use client";

import styles from "./inventory.module.scss";

import dndStyles from "../dnd.module.scss";
import { InventoryItems } from "./inventory-items";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemType } from "@/api/enums";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { dropAcceptTypePrefix } from "../dndHelpers";

type InventoryProps = {};

export const Inventory = ({}: InventoryProps) => {
  const {
    apiInventory: {
      api: { data },
    },
  } = useCharacterManagementContext();
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
      <div> Menu inventory</div>
      <div className={styles.inventoryItems}>
        {data.items ? (
          <InventoryItems
            items={data.items}
            tooltipId="inventory-item-tooltip"
          />
        ) : null}
      </div>
    </div>
  );
};
