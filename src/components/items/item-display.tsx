"use client";

import { Item, ItemStatisticStatsList } from "@/api/types";
import styles from "./item-display.module.scss";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
type ItemDisplayProps = {
  item: Item;
  tooltipId: string;
  onHover: (item: Item) => void;
  refForWrapper?: React.LegacyRef<HTMLDivElement> | undefined;
  opacity?: number;
};

export const ItemDisplay = ({
  item,
  tooltipId,
  onHover,
  refForWrapper,
  opacity,
}: ItemDisplayProps) => {
  return (
    <div
      data-tooltip-id={tooltipId}
      className={styles.itemDisplayWrapper}
      onMouseEnter={() => onHover(item)}
      ref={refForWrapper}
      style={{ opacity }}
    >
      <div
        className={`${styles.levelDisplay} ${
          styles[item.rarity.toLowerCase()]
        }`}
      >
        {item.level}
      </div>
      <div className={styles.itemDisplayBackground}></div>
      <Image src="/images/item-placeholder.png" alt="item" fill />
    </div>
  );
};

type ItemStatisticsProps<StatNameType extends string> = {
  statistics: ItemStatisticStatsList<StatNameType>;
};

//TODO: here shoould be an enum or type depends on statistic
export const ItemStatistics = ({ statistics }: ItemStatisticsProps<string>) => {
  return Object.entries(statistics)
    .sort()
    .map(([name, stat]) => {
      const statValuePositive = stat.value > 0;
      const statValuePercentPositive = stat.percentageValue > 0;
      return (
        <React.Fragment key={name}>
          <div className={styles.statisticWrapper}>
            <div className={styles.statName}>{stat.name}</div>
            <div
              className={`${
                statValuePositive ? styles.statPositive : styles.statNegative
              }`}
            >
              {statValuePositive ? "+" : ""}
              {stat.value}
            </div>
          </div>
          {stat.percentageValue ? (
            <div className={styles.statisticWrapper}>
              <div className={styles.statName}>{stat.name}</div>
              <div
                className={`${
                  statValuePercentPositive
                    ? styles.statPositive
                    : styles.statNegative
                }`}
              >
                {statValuePercentPositive ? "+" : ""}
                {stat.percentageValue}%
              </div>
            </div>
          ) : null}
        </React.Fragment>
      );
    });
};

type ItemTooltipContentProps = { item: Item };

export const ItemTooltipContent = ({ item }: ItemTooltipContentProps) => {
  return (
    <div className={styles.itemTooltipContentWrapper}>
      <div>{item.nameWithPrefixAndSuffix}</div>
      <div className={styles.itemStatisticsWrapper}>
        <div>
          <ItemStatistics statistics={item.statistics.baseStatistics} />
        </div>
        <div>
          <ItemStatistics statistics={item.statistics.additionalStatistics} />
        </div>
      </div>
      <div className={styles.itemBasicDetailsWrapper}>
        <div>
          <div>Level: {item.level}</div>
          <div>Value: {item.value}</div>
          <div>Type: {item.type}</div>
        </div>
        <div>
          <div>Rarity: {item.rarity}</div>
          <div>Upgrade points: {item.upgradePoints}</div>
          <div>Weight: {item.weight.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};

type ItemTooltipContentWrapperProps = {
  item: Item | null;
  tooltipId: string;
  opacity?: number;
  customClassName?: string;
};

export const ItemTooltipContentWrapper = ({
  item,
  tooltipId,
  opacity,
  customClassName,
}: ItemTooltipContentWrapperProps) => {
  return (
    <Tooltip
      className={`${styles.itemsTooltip} ${customClassName}`}
      id={tooltipId}
      opacity={opacity !== 0 ? opacity : 0}
    >
      {item ? <ItemTooltipContent item={item} /> : null}
    </Tooltip>
  );
};
