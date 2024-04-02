import { FC } from "react";
import { CharacterStatistics } from "./character-statistics";
import { OtherUserEquipment } from "../equipment";
import { CharacterAvatar } from "./character-avatar";
import styles from "./other-user-character.module.scss";

type OtherUserCharacterProps = {
  userId: string;
};

export const OtherUserCharacter: FC<OtherUserCharacterProps> = ({ userId }) => {
  return (
    <div className={styles.otherUserEquipmentWrapper}>
      <div className={styles.characterAvatar}>
        <CharacterAvatar />
      </div>
      <OtherUserEquipment userId={userId} />
      <CharacterStatistics />
    </div>
  );
};
