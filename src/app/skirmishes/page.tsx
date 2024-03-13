import styles from "./skirmishes.module.scss";
import { SkirmishesList } from "@/components/skirmishes";

export default async function Page() {
  return (
    <main className={styles.skirmishesPageWrapper}>
      <h1>Available skirmishesh</h1>

      <SkirmishesList />
    </main>
  );
}
