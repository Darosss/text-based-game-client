import { Character } from "@/api/types";
import styles from "./character-preview.module.scss";
import { HeadDetails } from "../details/head-details";

type CharacterProps = {
  character: Character;
};
export const CharacterPreview = ({ character }: CharacterProps) => {
  return (
    <div className={styles.characterPreviewWrapper}>
      <div className={styles.characterHeadDetailsWrapper}>
        <div>
          <div> Level </div> <div> {character.level}</div>
          <div> Health </div> <div> {character.health}</div>
        </div>
        <div>
          <div> Name </div> <div> {character.name}</div>
        </div>
      </div>
      <HeadDetails stats={character.stats} />
    </div>
  );
};
