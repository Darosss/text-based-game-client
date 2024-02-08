import { Item, ItemStatisticStatsList } from "@/api/types";
import { Tooltip } from "react-tooltip";
import styles from "./item-display.module.scss";
import Image from "next/image";
import React from "react";
type ItemDisplayProps = {
  item: Item;
};

export const ItemDisplay = ({ item }: ItemDisplayProps) => {
  const itemId = `${item.id.timestamp}`;

  return (
    <>
      <div data-tooltip-id={itemId} className={styles.itemDisplayWrapper}>
        <Image src="/images/image-placeholder.png" alt="item" fill />
      </div>

      <Tooltip id={itemId} clickable className={styles.tooltipHead} opacity={1}>
        <div className={styles.itemTooltipWrapper}>
          <div>{item.nameWithPrefixAndSuffix}</div>
          <div className={styles.itemStatisticsWrapper}>
            <div>
              <ItemStatistics statistics={item.statistics.baseStatistics} />
            </div>
            <div>
              <ItemStatistics
                statistics={item.statistics.additionalStatistics}
              />
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
      </Tooltip>
    </>
  );
};

type ItemStatisticsProps<StatNameType extends string> = {
  statistics: ItemStatisticStatsList<StatNameType>;
};

//TODO: here shoould be an enum or type depends on statistic
const ItemStatistics = ({ statistics }: ItemStatisticsProps<string>) => {
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
