import { SkirmishesList } from "@/components/skirmishes/skirmishes-list";
import styles from "./skirmishes.module.scss";

export default async function Page() {
  return (
    <div className={styles.skirmishesPageWrapper}>
      <h1>Available skirmishesh</h1>

      <SkirmishesList />
    </div>
  );
}
