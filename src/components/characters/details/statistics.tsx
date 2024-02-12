import { HeroAdditionalStatistics, HeroBaseStatistics } from "@/api/types";
import styles from "./statistics.module.scss";

type BaseStatisticsProps = { statistics: HeroBaseStatistics };

export const BaseStatistics = ({ statistics }: BaseStatisticsProps) => {
  return (
    <div className={styles.characterStatistics}>
      <div> Statistics </div>
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

type AdditionalStatisticsProps = {
  statistics: HeroAdditionalStatistics;
  additionalClassName?: string;
};

export const AdditionalStatistics = ({
  statistics,
  additionalClassName,
}: AdditionalStatisticsProps) => {
  return (
    <div
      className={`${styles.characterAdditionalStatistics} ${
        additionalClassName ?? ""
      }`}
    >
      <div> Additional</div>
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
