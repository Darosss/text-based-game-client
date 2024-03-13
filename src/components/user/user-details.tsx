import { FC } from "react";
import { useUserContext } from "./user-context";
import styles from "./user-details.module.scss";
export const UserDetails: FC = () => {
  const {
    apiUser: { api },
  } = useUserContext();

  const { username, gold } = api.data;
  return (
    <div className={styles.userDetailsWrapper}>
      <div>
        Username: <span>{username}</span>
      </div>
      <div>
        Gold: <span>{gold}</span>
      </div>
    </div>
  );
};
