import {
  CharacterTypesAlias,
  HeroAdditionalStatistics,
  HeroBaseStatistics,
} from "@/api/types";
import styles from "./statistics.module.scss";
import { FC, useState } from "react";
import { Button } from "@/components/common/button";
import { fetchBackendApi } from "@/api/fetch";
import { isMercenaryCharacter } from "@/api/utils";

type BaseStatisticsProps = {
  statistics: HeroBaseStatistics;
  canTrain?: {
    onSuccesTrain: () => void;
  };
};

export const BaseStatistics: FC<BaseStatisticsProps> = ({
  statistics,
  canTrain,
}) => {
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

export const AdditionalStatistics: FC<AdditionalStatisticsProps> = ({
  statistics,
  additionalClassName,
}) => {
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

type BaseDetailsProps = {
  character: CharacterTypesAlias;
};

export const BaseDetails: FC<BaseDetailsProps> = ({ character }) => {
  const { name, level, health } = character;
  const isMercenary = isMercenaryCharacter(character);
  return (
    <div className={styles.baseDetails}>
      <div>
        <div>Name</div>
        <div> {name}</div>
      </div>
      <div>
        <div>Level </div>
        <div>{level}</div>
      </div>
      <div>
        <div>Health points</div>
        <div>{health}</div>
      </div>
      {!isMercenary ? (
        <div>
          <div>Experience </div>
          <div>
            {character.experience} / {character.expToLevelUp}
          </div>
        </div>
      ) : null}
    </div>
  );
};
