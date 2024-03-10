import { useEffect } from "react";
import styles from "./current-challenge.module.scss";
import { ChallengeData, ChoosenChallange } from "../types";
import { formatTime } from "@/utils/utils";
import { useFetch } from "@/hooks/useFetch";
import { Button } from "@/components/common/button";
import { FightReportType } from "@/api/types";
import { FightReportDisplay } from "@/components/fight-report/fight-report-display";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";

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
  const {
    api: {
      isPending,
      error,
      responseData: { data },
    },
    fetchData,
  } = useFetch<CurrentChallengeResponse>(
    {
      url: "current-challenge",
      method: "GET",
    },
    { manual: true }
  );

  const remainingTime = useCountdownTimer({
    toTimestamp: chosenChallenge.timestamp,
  });

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
    api: {
      isPending,
      error,
      responseData: { data },
    },
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
