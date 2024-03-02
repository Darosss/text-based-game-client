import React, { useState } from "react";
import { FightReportType, InventoryItemType } from "@/api/types";
import styles from "./fight-report.module.scss";
import {
  ItemDisplay,
  ItemTooltipContentWrapper,
} from "@/components/items/item-display";
import { Button } from "@/components/common/button";
import { FightReportTurns } from "./fight-report-turns";
import { Participants } from "./participants";

type FightReportDisplayProps = {
  report: FightReportType;
};

enum CurrentView {
  DEFAULT = "default",
  EXPANDED_LOGS = "expandedLogs",
  EXPANDED_STATS = "expandedStats",
  //TODO: expanded stats
}
const tooltipId = "equipment-tooltip";

export const FightReportDisplay = ({ report }: FightReportDisplayProps) => {
  const [itemOnHover, setItemOnHover] = useState<InventoryItemType | null>(
    null
  );
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
      <ItemTooltipContentWrapper
        customClassName={styles.fightReportTooltip}
        item={itemOnHover}
        tooltipId={tooltipId}
      />
      <div className={styles.reportBaseDetails}>
        <div>
          <div>{report.status}</div>
          <div>Experience: {report.gainedExperience}</div>
          <div>Gold: {report.gainedGold}</div>
        </div>
        <div className={styles.lootDetails}>
          {report.loot.map((item) => (
            <div
              key={JSON.stringify(item.id)}
              className={styles.itemLootWrapper}
            >
              <ItemDisplay
                item={item}
                tooltipId={tooltipId}
                onHover={(item) => setItemOnHover(item)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fightReportDetails}>
        <Participants characters={report.characters} enemies={report.enemies} />
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
