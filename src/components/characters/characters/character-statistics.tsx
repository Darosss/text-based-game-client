import { FC } from "react";
import {
  AdditionalStatistics,
  BaseDetails,
  BaseStatistics,
} from "../details/statistics";
import { useCharacterManagementContext } from "./character-management-context";
import styles from "./character-statistics.module.scss";
import { isMercenaryCharacter } from "@/api/utils";

export const CharacterStatistics: FC = () => {
  const {
    apiCharacter: {
      api: { data },
      fetchData,
    },
  } = useCharacterManagementContext();

  return (
    <div className={styles.characterStatistics}>
      <div className={styles.baseDetails}>
        <BaseDetails character={data} />
      </div>
      <BaseStatistics
        statistics={data.stats.statistics}
        {...{
          canTrain: !isMercenaryCharacter(data)
            ? { onSuccesTrain: fetchData }
            : undefined,
        }}
      />
      <AdditionalStatistics statistics={data.stats.additionalStatistics} />
    </div>
  );
};
