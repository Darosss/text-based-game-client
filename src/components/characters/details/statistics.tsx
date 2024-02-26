import { HeroAdditionalStatistics, HeroBaseStatistics } from "@/api/types";
import styles from "./statistics.module.scss";
import { useState } from "react";
import { Button } from "@/components/common/button";
import { fetchBackendApi } from "@/api/fetch";

type BaseStatisticsProps = {
  statistics: HeroBaseStatistics;
  canTrain?: {
    onSuccesTrain: () => void;
  };
};

export const BaseStatistics = ({
  statistics,
  canTrain,
}: BaseStatisticsProps) => {
  return (
    <div className={styles.characterStatistics}>
      <div>Statistics</div>
      {Object.entries(statistics)
        .sort()
        .map(([statName, value]) => (
          <div key={statName} className={styles.statisticsVisibleDetails}>
            <div>{value.name}</div>
            <div className={styles.statisticValueWrapper}>
              {canTrain ? (
                <TrainBaseStatisticButton
                  statisticName={statName}
                  onSuccessTrain={canTrain.onSuccesTrain}
                />
              ) : null}
              {value.effectiveValue}
            </div>
          </div>
        ))}
    </div>
  );
};

type TrainBaseStatisticButtonProps = {
  statisticName: string;
  onSuccessTrain: () => void;
};

const TrainBaseStatisticButton = ({
  statisticName,
  onSuccessTrain,
}: TrainBaseStatisticButtonProps) => {
  const [statAddValue, setStatAddValue] = useState(0);
  return (
    <>
      {statAddValue > 0 ? (
        <Button
          onClick={() => {
            fetchBackendApi<boolean>({
              url: `characters/train-statistic/${statisticName}/${statAddValue}`,
              method: "PATCH",
            }).then((response) => {
              if (response?.body.data) {
                setStatAddValue(0);
                onSuccessTrain();
              }
            });
          }}
        >
          Train
        </Button>
      ) : null}
      <Button
        onClick={() => {
          setStatAddValue((prevState) => prevState + 1);
        }}
      >
        + {statAddValue}
      </Button>
    </>
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
