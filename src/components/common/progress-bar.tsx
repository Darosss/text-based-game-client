import { FC } from "react";
import styles from "./progress-bar.module.scss";
import { Tooltip } from "react-tooltip";
type ProgressBarProps = {
  value: number;
  maxValue: number;
  valueName: string;
  maxValueName: string;
  showPercents?: boolean;
  className?: string;
};

const TOOLTIP_ID = "progress-bar-tooltip-id";

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  maxValue,
  valueName,
  maxValueName,
  showPercents,
  className,
}) => {
  return (
    <div
      className={`${styles.progressBarWrapper} ${className ? className : ""}`}
    >
      <progress value={value} max={maxValue} data-tooltip-id={TOOLTIP_ID} />
      <Tooltip id={TOOLTIP_ID}>
        <div>
          {valueName}: {value}
        </div>
        <div>
          {maxValueName}: {maxValue}
        </div>
      </Tooltip>
      {showPercents ? (
        <span>{((value / maxValue) * 100).toFixed(0)}%</span>
      ) : null}
    </div>
  );
};
