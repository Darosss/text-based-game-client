import { useEffect, useState } from "react";
import styles from "./current-challenge.module.scss";
import { ChallengeData, ChoosenChallange } from "../types";
import { formatTime, getRemainingTimeFromDateToDate } from "@/utils/utils";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/common/button";
import { FightReportType } from "@/api/types";
import { FightReportDisplay } from "@/components/fight-report/fight-report-display";

type CurrentChallengeProps = {
  chosenChallenge: ChoosenChallange;
  chosenChallengeData: ChallengeData;

  onConfirmReport: () => void;
  onCancel: () => void;
};

type CurrentChallengeResponse = FightReportType;

export const CurrentChallenge = ({
  chosenChallenge,
  chosenChallengeData,
  onConfirmReport,
  onCancel,
}: CurrentChallengeProps) => {
  const [remainingTime, setRemainingTime] = useState(-1);
  const {
    api: { isPending, error, data },
    fetchData,
  } = useFetch<CurrentChallengeResponse>(
    {
      url: "current-challenge",
      method: "GET",
    },
    { manual: true }
  );
  useEffect(() => {
    const remainingTimeMs = getRemainingTimeFromDateToDate({
      timestamp: Date.now(),
      toTimestamp: Number(new Date(chosenChallenge.timestamp).getTime()),
    });

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
  }, [chosenChallenge]);

  useEffect(() => {
    if (remainingTime === 0) {
      fetchData();
    }
  }, [fetchData, remainingTime]);

  return (
    <div className={styles.currentChallengeWrapper}>
      {data ? (
        <div className={styles.reportDisplayWrapper}>
          <FightReportDisplay report={data} />

          <div className={styles.reportButtonConfirm}>
            <Button onClick={onConfirmReport} defaultButtonType="success">
              Confirm
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.skirmishCountdown}>
          <div>
            <div>{chosenChallengeData.name}</div>
            <div>
              <span>
                {"("}
                {chosenChallengeData.difficulty}
                {")"}
              </span>
            </div>
          </div>
          <div>
            <div>{formatTime(remainingTime)}</div>
          </div>
          <div>
            <CancelCurrentChallengeButton onCancel={onCancel} />
          </div>
        </div>
      )}
    </div>
  );
};

type CancelCurrentChallengeButtonProps = {
  onCancel: () => void;
};

const CancelCurrentChallengeButton = ({
  onCancel,
}: CancelCurrentChallengeButtonProps) => {
  const {
    api: { isPending, error, data },
    fetchData,
  } = useFetch(
    {
      url: "cancel-current-challenge",
      method: "POST",
    },
    { manual: true }
  );

  const handleOnCancel = async () => {
    const data = await fetchData();

    if (data) onCancel();
  };
  return (
    <Button onClick={() => handleOnCancel()} defaultButtonType="danger">
      {isPending ? "Wait" : "Cancel"}
    </Button>
  );
};
