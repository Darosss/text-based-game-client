import { ReportTurnActionMoveDefend } from "@/api/types";
import styles from "./fight-report-turns.module.scss";
import { FC } from "react";

type DefendReportDetailProps = {
  defend: ReportTurnActionMoveDefend;
};

export const DefendReportDetails: FC<DefendReportDetailProps> = ({
  defend,
}) => {
  const { defendType, name, health, receivedDamage, parryAttack } = defend;
  return (
    <div className={styles.defend}>
      <div>
        <span className={styles.heroNameDefend}>{name}</span>({health}){" "}
        {/* TODO: add health icon */}
        {defendType !== "NULL" ? (
          <>
            <span className={styles[defendType.toLowerCase()]}>
              {defendType.toLowerCase()}
            </span>{" "}
            attack
          </>
        ) : (
          ` received ${receivedDamage} damage`
        )}
      </div>
    </div>
  );
};
