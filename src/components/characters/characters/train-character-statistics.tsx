import { FC } from "react";
import { AdditionalStatistics, BaseStatistics } from "../details/statistics";
import { useCharacterManagementContext } from "./character-management-context";
import styles from "./train-character-statistics.module.scss";
import { isMercenaryCharacter } from "@/api/utils";

type TrainCharacterStatisticsProps = {};

export const TrainCharacterStatistics: FC<
  TrainCharacterStatisticsProps
> = ({}) => {
  const {
    api: { data },
    fetchData,
  } = useCharacterManagementContext();

  return (
    <div className={styles.trainCharacterStatisticsWrapper}>
      <BaseStatistics
        statistics={data.stats.statistics}
        {...(!isMercenaryCharacter(data)
          ? { canTrain: { onSuccesTrain: fetchData } }
          : null)}
      />
      <AdditionalStatistics statistics={data.stats.additionalStatistics} />
    </div>
  );
};
