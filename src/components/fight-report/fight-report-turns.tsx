import { ReportTurn } from "@/api/types";
import styles from "./fight-report-turns.module.scss";
import { AttackReportDetails } from "./attack-report-details";
import { DefendReportDetails } from "./defend-report-details";

type FightReportTurnsProps = {
  turns: ReportTurn[];
};

export const FightReportTurns = ({ turns }: FightReportTurnsProps) => {
  {
    return turns.map((turnReport, index) => (
      <div key={index} className={styles.fightTurnReportWrapper}>
        <div className={styles.turnNumber}>
          Turn {turnReport.turnNumber + 1}
        </div>
        <div className={styles.turnActionsWrapper}>
          {turnReport.actions.map(({ basicAttack, doubledAttack }, index) => {
            const { attack, defend } = basicAttack;

            return (
              <div
                key={new Date().getTime() + "-" + index}
                className={styles.actionWrapper}
              >
                <div className={styles.actionExecute}>
                  <div>
                    <AttackReportDetails
                      attack={attack}
                      defenderName={defend.name}
                    />
                    <DefendReportDetails defend={defend} />
                  </div>
                  {doubledAttack ? (
                    <div>
                      <AttackReportDetails
                        attack={doubledAttack.attack}
                        defenderName={doubledAttack.defend.name}
                      />
                      <DefendReportDetails defend={doubledAttack.defend} />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  }
};