import { FC } from "react";
import styles from "./user-details.module.scss";
import { useAuthContext } from "../auth";
export const UserDetails: FC = () => {
  const {
    apiUser: { api },
  } = useAuthContext();

  const { username, gold } = api.data;

  if (!username) return null;

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
