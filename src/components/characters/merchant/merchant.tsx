"use client";

import { InventoryItemType, ItemsCostType } from "@/api/types";
import React, { FC, useMemo, useState } from "react";
import styles from "./merchant.module.scss";
import {
  ItemsContainer,
  ItemTooltipContentWrapper,
  filterItemsEntries,
  getSortedItems,
} from "@/components/items";
import type { FilterType, SortType } from "@/components/items";
import { MerchantItem } from "./merchant-item";
import { fetchBackendApi } from "@/api/fetch";
import { useAuthContext } from "@/components/auth";
import { toast } from "react-toastify";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { ItemType } from "@/api/enums";
import { allowDropToPrefixes } from "../dndHelpers";
import dndStyles from "../dnd.module.scss";
import { useMerchantContext } from "./merchant-context";
import {
  BaseDropResultsFromInventory,
  UseDropBaseCollectedProps,
} from "../dndTypes";
import { PossibleDropResultActions } from "../equipment";
import { MerchantCommodityTimer } from "./merchant-commodity-timer";
import { FetchingInfo } from "@/components/common";
import { useInventoryManagementContext } from "../inventory";

const TOOLTIP_ID = "merchant-item-tooltip";

const findCostForItem = (itemsCost: ItemsCostType, itemId: string) =>
  Object.entries(itemsCost).find(([id]) => id === itemId);

export const Merchant: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop<
    unknown,
    BaseDropResultsFromInventory,
    UseDropBaseCollectedProps
  >(
    () => ({
      accept: Object.values(ItemType).map(
        (val) => allowDropToPrefixes.equipmentAndMerchant + val
      ),
      drop: () => ({
        dropAction: PossibleDropResultActions.SELL_ITEM,
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
      api: { responseData, isPending, error },
      fetchData: fetchMerchantData,
    },
  } = useMerchantContext();

  const {
    apiUser: {
      api: { data: userData },
      fetchData: fetchUserData,
    },
  } = useAuthContext();

  const { fetchData: fetchInventoryData } = useInventoryManagementContext();

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
    () =>
      getSortedItems(
        filterItemsEntries(responseData.data?.items || {}, filter),
        sort
      ),
    [filter, sort, responseData.data?.items]
  );

  const handleOnBuyItem = (id: string, cost: number) => {
    if (userData.user.gold < cost)
      return toast.error("You do not have enough gold");
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

  if (isPending === null || error || !responseData.data) {
    return (
      <FetchingInfo
        isPending={isPending}
        error={error}
        refetch={fetchMerchantData}
      />
    );
  }

  const isActive = canDrop && isOver;
  return (
    <div className={styles.merchantWrapper}>
      <div className={styles.merchantCommodityInfo}>
        <MerchantCommodityTimer
          commodityRefreshAt={responseData.data.commodityRefreshAt}
        />
      </div>
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
              findCostForItem(
                responseData.data?.itemsCost || {},
                value[0]
              )?.[1] || -1;
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
