import { HeroAdditionalStatistics, HeroBaseStatistics } from "@/api/types";
import styles from "./statistics.module.scss";

type BaseStatisticsProps = { statistics: HeroBaseStatistics };

export const BaseStatistics = ({ statistics }: BaseStatisticsProps) => {
  return (
    <div className={styles.characterStatistics}>
      {Object.entries(statistics)
        .sort()
        .map(([statName, value]) => (
          <div key={statName} className={styles.baseStatisticVisibleDetails}>
            <div>{value.name}</div>
            <div>{value.effectiveValue}</div>
          </div>
        ))}
    </div>
  );
};

type AdditionalStatisticsProps = { statistics: HeroAdditionalStatistics };

export const AdditionalStatistics = ({
  statistics,
}: AdditionalStatisticsProps) => {
  return (
    <div className={styles.characterAdditionalStatistics}>
      {Object.entries(statistics)
        .sort()
        .map(([statName, value]) => (
          <div key={statName} className={styles.statisticsVisibleDetails}>
            <div>{value.name}</div>
            <div>{value.effectiveValue}</div>
          </div>
        ))}
    </div>
  );
};
//TODO: tooltip with advanced statistics display
