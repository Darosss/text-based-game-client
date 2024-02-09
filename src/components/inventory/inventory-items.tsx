import { Item, InventoryItems as InventoryItemsType } from "@/api/types";
import { useState } from "react";
import { ItemDisplay } from "../items/item-display";
import { ItemTooltipContentWrapper } from "../items/item-display";
import styles from "./inventory-items.module.scss";

type InventoryItemsProps = {
  items: InventoryItemsType;
  tooltipId: string;
};

export const InventoryItems = ({ items, tooltipId }: InventoryItemsProps) => {
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  return (
    <div className={styles.itemsWrapper}>
      <ItemTooltipContentWrapper item={currentItem} tooltipId={tooltipId} />
      {Object.entries(items).map(([id, item]) => (
        <div key={id} className={styles.oneItemWrapper}>
          <ItemDisplay
            item={item}
            tooltipId={tooltipId}
            onHover={(item) => setCurrentItem(item)}
          />
        </div>
      ))}
    </div>
  );
};
