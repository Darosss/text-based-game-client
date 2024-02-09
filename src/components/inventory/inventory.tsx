"use client";

import { useFetch } from "@/hooks/useFetch";
import styles from "./inventory.module.scss";
import { Inventory as InventoryType } from "@/api/types";
import { InventoryItems } from "./inventory-items";

type InventoryProps = {};

export const Inventory = ({}: InventoryProps) => {
  const {
    api: { isPending, error, data },
    fetchData,
  } = useFetch<InventoryType>({
    url: "your-inventory",
    method: "GET",
  });
  if (!data) return <></>;

  return (
    <div className={styles.inventoryWrapper}>
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
