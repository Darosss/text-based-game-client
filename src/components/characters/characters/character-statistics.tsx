import { CharacterTypesAlias } from "@/api/types";
import { AdditionalStatistics, BaseStatistics } from "../details/statistics";
import { useCharacterManagementContext } from "./character-management-context";
import styles from "./character-statistics.module.scss";
import { isMercenaryCharacter } from "@/api/utils";

export const CharacterStatistics = () => {
  const {
    apiCharacter: {
      api: { data },
      fetchData,
    },
  } = useCharacterManagementContext();

  return (
    <div className={styles.characterStatistics}>
      <BaseDetails character={data} />
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

type BaseDetailsProps = {
  character: CharacterTypesAlias;
};

const BaseDetails = ({ character }: BaseDetailsProps) => {
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
