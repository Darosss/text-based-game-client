import React, { useState } from "react";
import { FightReportType } from "@/api/types";
import styles from "./fight-report.module.scss";
import { ItemDisplay } from "@/components/items/item-display";
import { CharacterPreview, EnemyPreview } from "@/components/characters";
import { Button } from "@/components/common/button";
import { FightReportTurns } from "./fight-report-turns";

type FightReportDisplayProps = {
  report: FightReportType;
};

enum CurrentView {
  DEFAULT = "default",
  EXPANDED_LOGS = "expandedLogs",
  EXPANDED_STATS = "expandedStats",
  //TODO: expanded stats
}

export const FightReportDisplay = ({ report }: FightReportDisplayProps) => {
  const [currentView, setCurrentView] = useState<CurrentView>(
    CurrentView.DEFAULT
  );
  //TODO: later from localstorage

  const handleOnClickExpandLogsButton = () => {
    if (currentView !== CurrentView.EXPANDED_LOGS)
      setCurrentView(CurrentView.EXPANDED_LOGS);
    else setCurrentView(CurrentView.DEFAULT);
  };

  return (
    <div className={`${styles.fightReportWrapper} ${styles[currentView]}`}>
      <div className={styles.reportBaseDetails}>
        <div>
          <div>{report.status}</div>
          <div>Experience: {report.gainedExperience}</div>
        </div>
        <div className={styles.lootDetails}>
          {report.loot.map((item) => (
            <div
              key={JSON.stringify(item.id)}
              className={styles.itemLootWrapper}
            >
              <ItemDisplay item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fightReportDetails}>
        <div className={styles.participantsDetails}>
          <div>
            {report.characters.map((character) => (
              <CharacterPreview
                key={JSON.stringify(character)}
                character={character}
              />
            ))}
          </div>
          <div>
            {report.enemies.map((enemy) => (
              <EnemyPreview key={JSON.stringify(enemy)} enemy={enemy} />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.fightReportLogsWrapper}>
        <div className={styles.expandButtonWrapper}>
          <Button
            defaultButtonType="primary"
            onClick={() => handleOnClickExpandLogsButton()}
          >
            Battle logs
          </Button>
        </div>
        <FightReportTurns turns={report.turnsReports} />
      </div>
    </div>
  );
};