import { FC } from "react";
import styles from "./user-details.module.scss";
import { useAuthContext } from "@/components/auth";
import { ProgressBar } from "@/components/common";
export const UserDetails: FC = () => {
  const {
    apiUser: { api },
  } = useAuthContext();

  const {
    user: { username, gold },
    heroDetails: { health, maxHealth, experience, neededExp, level },
  } = api.data;

  if (!username) return null;

  return (
    <div className={styles.userDetailsWrapper}>
      <div>
        Username: <span>{username}</span>
      </div>
      <div>
        Gold: <span>{gold}</span>
      </div>
      <div>
        Health:
        <span>
          <ProgressBar
            value={health}
            maxValue={maxHealth}
            valueName="Health"
            maxValueName="Max health"
            showPercents={true}
          />
        </span>
      </div>
      <div>
        Level: <span>{level}</span>
      </div>
      <div>
        Experience:
        <span>
          <ProgressBar
            value={experience}
            maxValue={neededExp}
            valueName="Experience"
            maxValueName="Needed exp"
            showPercents={true}
          />
        </span>
      </div>
    </div>
  );
};
