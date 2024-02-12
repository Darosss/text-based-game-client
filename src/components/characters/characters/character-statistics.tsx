import { AdditionalStatistics, BaseStatistics } from "../details/statistics";
import { useCharacterManagementContext } from "./character-management-context";
import styles from "./character-statistics.module.scss";

export const CharacterStatistics = () => {
  const {
    apiCharacter: {
      api: { data },
    },
  } = useCharacterManagementContext();

  if (!data) return <></>;
  return (
    <div className={styles.characterStatistics}>
      <BaseStatistics statistics={data.stats.statistics} />
      <AdditionalStatistics statistics={data.stats.additionalStatistics} />
    </div>
  );
};
