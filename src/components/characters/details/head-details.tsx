import Image from "next/image";
import styles from "./head-details.module.scss";
import { HeroStats } from "@/api/types";
import { AdditionalStatistics, BaseStatistics } from "./statistics";

type HeadDetailsProps = {
  stats: HeroStats; //TODO: avatar from db
  asDefender?: boolean;
};
export const HeadDetails = ({ stats, asDefender }: HeadDetailsProps) => {
  return (
    <div
      className={styles.characterHeadWrapper}
      style={{ flexDirection: asDefender ? "row-reverse" : undefined }}
    >
      <div className={styles.characterAvatar}>
        <Image src="/images/hero-placeholder.png" alt="hero img" fill />
        <div className={`${styles.characterAdditionalStatisticsWrapper}`}>
          <AdditionalStatistics
            statistics={stats.additionalStatistics}
            additionalClassName={styles.additionalStatistics}
          />
        </div>
      </div>
      <BaseStatistics statistics={stats.statistics} />
    </div>
  );
};
