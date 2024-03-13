"use client";

import dndStyles from "../dnd.module.scss";
import { InventoryItems } from "./inventory-items";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemType } from "@/api/enums";
import { allowDropToPrefixes } from "../dndHelpers";
import { Inventory as InventoryType } from "@/api/types";
import { useInventoryControlContext } from "./inventory-control-context";
import { ItemsContainer } from "@/components/items";
import {
  DropDragObjectIntoInventory,
  InventoryDropResult,
  UseDropBaseCollectedProps,
} from "../dndTypes";
import { FC } from "react";

type InventoryProps = {
  data: InventoryType;
};

export const Inventory: FC<InventoryProps> = ({ data }) => {
  const [{ canDrop, isOver }, drop] = useDrop<
    DropDragObjectIntoInventory,
    InventoryDropResult,
    UseDropBaseCollectedProps
  >(
    () => ({
      accept: Object.values(ItemType).map(
        (val) => allowDropToPrefixes.inventory + val
      ),
      drop: (item) => {
        return {
          dropAction: item.dropAction,
        };
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    ["any"]
  );
  const { filter, setFilter, sort, setSort } = useInventoryControlContext();

  const isActive = canDrop && isOver;
  return (
    <ItemsContainer
      filter={filter}
      setFilter={setFilter}
      sort={sort}
      setSort={setSort}
    >
      <InventoryItems
        items={data.items}
        dropRef={drop}
        tooltipId="inventory-item-tooltip"
        className={` ${
          isActive ? dndStyles.active : canDrop ? dndStyles.canDrop : ""
        }`}
      />
    </ItemsContainer>
  );
};
