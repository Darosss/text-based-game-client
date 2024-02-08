import { NpcEnemy } from "@/api/types";
import styles from "./enemy-preview.module.scss";
import { HeadDetails } from "../details/head-details";

type EnemyProps = {
  enemy: NpcEnemy;
};

export const EnemyPreview = ({ enemy }: EnemyProps) => {
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
