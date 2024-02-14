import { Character } from "@/api/types";
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
      <BaseDetails character={data} />
      <BaseStatistics statistics={data.stats.statistics} />
      <AdditionalStatistics statistics={data.stats.additionalStatistics} />
    </div>
  );
};

type BaseDetailsProps = {
  character: Character;
};

const BaseDetails = ({
  character: { name, level, health, experience, expToLevelUp },
}: BaseDetailsProps) => {
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
      <div>
        <div>Experience </div>
        <div>
          {experience} / {expToLevelUp}
        </div>
      </div>
    </div>
  );
};
