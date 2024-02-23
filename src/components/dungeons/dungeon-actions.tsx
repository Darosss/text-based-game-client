import { formatTime, getRemainingTimeFromDateToDate } from "@/utils/utils";
import { useEffect, useState } from "react";
import { Button } from "../common/button";
import styles from "./dungeons.module.scss";
import { useFetch } from "@/hooks/useFetch";
import { FightReportDisplay } from "@/components/fight-report/fight-report-display";
import { FightReportType } from "@/api/types";

type DungeonActionsProps = {
  dungeonLevel: number;
  canFightDate: Date;
  onConfirmReport: () => void;
};

type StartAFightResponse = FightReportType;

export const DungeonActions = ({
  dungeonLevel,
  canFightDate,
  onConfirmReport,
}: DungeonActionsProps) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const {
    api: {
      isPending,
      error,
      responseData: { data },
    },
    fetchData,
  } = useFetch<StartAFightResponse>(
    {
      url: `dungeons/start-a-fight/${dungeonLevel}`,
      method: "POST",
    },
    { manual: true }
  );
  useEffect(() => {
    const remainingTimeMs = getRemainingTimeFromDateToDate({
      timestamp: Date.now(),
      toTimestamp: Number(new Date(canFightDate.getTime()).getTime()),
    });
    if (remainingTimeMs <= 0) return;
    setRemainingTime(remainingTimeMs);
    const intervalId = setInterval(() => {
      setRemainingTime((prevCounter) => {
        const newTime = Math.max(0, prevCounter - 1000);
        if (newTime === 0) {
          clearInterval(intervalId);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [canFightDate]);

  useEffect(() => {
    if (data) setShowReport(true);
  }, [data]);

  return (
    <div className={styles.dungeonActionsWrapper}>
      {data && showReport ? (
        <div className={styles.reportDisplayWrapper}>
          <FightReportDisplay report={data} />

          <div className={styles.reportButtonConfirm}>
            <Button
              onClick={() => {
                onConfirmReport();
                setShowReport(false);
              }}
              defaultButtonType="success"
            >
              Confirm
            </Button>
          </div>
        </div>
      ) : remainingTime != 0 ? (
        formatTime(remainingTime)
      ) : (
        <Button defaultButtonType="danger" onClick={fetchData}>
          Fight
        </Button>
      )}
    </div>
  );
};
