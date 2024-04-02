import { FC } from "react";
import {
  AdditionalStatistics,
  BaseDetails,
  BaseStatistics,
} from "../details/statistics";
import { useCharacterManagementContext } from "./character-management-context";
import styles from "./character-statistics.module.scss";

type CharacterStatisticsProps = {};

export const CharacterStatistics: FC<CharacterStatisticsProps> = ({}) => {
  const {
    api: { data },
  } = useCharacterManagementContext();

  return (
    <div className={styles.characterStatistics}>
      <div className={styles.baseDetails}>
        <BaseDetails character={data} />
      </div>
      <BaseStatistics statistics={data.stats.statistics} />
      <AdditionalStatistics statistics={data.stats.additionalStatistics} />
    </div>
  );
};
