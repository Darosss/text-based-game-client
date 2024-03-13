import { Character } from "@/api/types";
import styles from "./character-preview.module.scss";
import { HeadDetails } from "../details";
import { FC } from "react";

type CharacterPreviewProps = {
  character: Character;
};
export const CharacterPreview: FC<CharacterPreviewProps> = ({ character }) => {
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
