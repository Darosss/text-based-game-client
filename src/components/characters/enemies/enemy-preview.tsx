import { NpcEnemy } from "@/api/types";
import styles from "./enemy-preview.module.scss";
import { HeadDetails } from "../details";
import { FC } from "react";

type EnemyPreviewProps = {
  enemy: NpcEnemy;
};

export const EnemyPreview: FC<EnemyPreviewProps> = ({ enemy }) => {
  return (
    <div className={styles.enemyPreviewWrapper}>
      <div className={styles.enemyHeadDetailsWrapper}>
        <div>
          <div> Level </div> <div> {enemy.level}</div>
          <div> Health </div> <div> {enemy.health}</div>
        </div>
        <div>
          <div> Name </div> <div> {enemy.name}</div>
        </div>
      </div>
      <HeadDetails stats={enemy.stats} asDefender={true} />
    </div>
  );
};

//TODO: tooltip with advanced statistics display
