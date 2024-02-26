import { ReportTurnActionMoveAttack } from "@/api/types";
import styles from "./fight-report-turns.module.scss";

type AttackReportDetailProps = {
  attack: ReportTurnActionMoveAttack;
  defenderName: string;
  asParry?: boolean;
};

export const AttackReportDetails = ({
  attack,
  defenderName,
  asParry,
}: AttackReportDetailProps) => {
  const { name, baseValues, debuffs, withDoubledAttack } = attack;
  return (
    <div className={styles.attack}>
      {withDoubledAttack || asParry ? (
        <div className={styles.additionalInfo}>
          {withDoubledAttack ? "Doubled attack" : ""}
          {asParry ? "Parry" : ""}
        </div>
      ) : null}
      {baseValues.attackStrength.attackStrength !== "NORMAL"
        ? `*${baseValues.attackStrength.attackStrength}*`
        : ""}
      <div>
        <span className={styles.heroName}> {name}</span> attacks(
        {baseValues.value}){" "}
        <span className={styles.heroNameDefend}>{defenderName}</span>
      </div>
    </div>
  );
};
