"use client";

import { InventoryItemType, ItemsCostType } from "@/api/types";
import React, { useMemo, useState } from "react";
import styles from "./merchant.module.scss";
import { ItemTooltipContentWrapper } from "@/components/items/item-display";
import { FilterType, SortType } from "@/components/items/types";
import { ItemsContainer } from "@/components/items/items-container";
import { filterItemsEntries, getSortedItems } from "@/components/items/utils";
import { MerchantItem } from "./merchant-item";
import { fetchBackendApi } from "@/api/fetch";
import { useUserContext } from "@/components/user/user-context";
import { toast } from "react-toastify";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemType } from "@/api/enums";
import { allowDropToPrefixes } from "../dndHelpers";
import dndStyles from "../dnd.module.scss";
import { useMerchantContext } from "./merchant-context";
type MerchantProps = {};

const TOOLTIP_ID = "merchant-item-tooltip";

const findCostForItem = (itemsCost: ItemsCostType, itemId: string) =>
  Object.entries(itemsCost).find(([id]) => id === itemId);

export const Merchant = ({}: MerchantProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: Object.values(ItemType).map(
        (val) => allowDropToPrefixes.equipmentAndMerchant + val
      ),
      drop: () => ({
        dropAction: "sell-item",
      }),
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    ["any"]
  );

  const {
    apiMerchant: {
      api: { data },
      fetchData: fetchMerchantData,
    },
  } = useMerchantContext();

  const {
    apiUser: {
      api: { data: userData },
      fetchData: fetchUserData,
    },
  } = useUserContext();

  const {
    apiInventory: { fetchData: fetchInventoryData },
  } = useCharacterManagementContext();

  const [currentItem, setCurrentItem] = useState<InventoryItemType | null>(
    null
  );

  const [filter, setFilter] = useState<FilterType>({
    name: null,
    showType: [],
  });
  const [sort, setSort] = useState<SortType>({
    sortBy: "name",
    descending: true,
  });

  const itemsToRender = useMemo(
    () => getSortedItems(filterItemsEntries(data.items, filter), sort),
    [filter, sort, data?.items]
  );

  const handleOnBuyItem = (id: string, cost: number) => {
    if (userData.gold < cost) return toast.error("You do not have enough gold");
    fetchBackendApi({
      url: `merchants/buy-item/${id}`,
      method: "POST",
      notification: { pendingText: "Trying to buy item" },
    }).then((response) => {
      if (response?.body.data) {
        fetchMerchantData();
        fetchInventoryData();
        fetchUserData();
      }
    });
  };
  const isActive = canDrop && isOver;
  return (
    <div className={styles.merchantWrapper}>
      <ItemsContainer
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      >
        <ItemTooltipContentWrapper
          customClassName={styles.inventoryTooltip}
          item={currentItem}
          tooltipId={TOOLTIP_ID}
        />
        <div
          className={`${styles.merchantItemsWrapper}
              ${isActive ? dndStyles.active : canDrop ? dndStyles.canDrop : ""}
        `}
          ref={drop}
        >
          {itemsToRender?.map((value) => {
            const itemCost =
              findCostForItem(data.itemsCost, value[0])?.[1] || -1;
            return (
              <MerchantItem
                key={value[0]}
                itemData={{ item: value[1], cost: itemCost }}
                tooltipId={TOOLTIP_ID}
                onHover={setCurrentItem}
                onItemBuy={handleOnBuyItem}
              />
            );
          })}
        </div>
      </ItemsContainer>
    </div>
  );
};
