import { Dungeons } from "@/components/dungeons/dungeons";
import styles from "./dungeons.module.scss";

export default async function DungeonsPage() {
  return (
    <div className={styles.dungeonsPageWrapper}>
      <h1>Dungeons</h1>
      <Dungeons />
    </div>
  );
}
