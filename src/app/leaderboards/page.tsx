import { Leaderboards } from "@/components/leaderboards";
import styles from "./leaderboards.module.scss";

export default async function Page() {
  return (
    <main className={styles.leaderboardsPageWrapper}>
      <h1>Leaderboards</h1>
      <Leaderboards />
    </main>
  );
}
