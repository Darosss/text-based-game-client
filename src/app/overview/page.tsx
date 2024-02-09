import { CharacterManagement } from "@/components/characters";
import styles from "./overview.module.scss";

export default async function Overview() {
  return (
    <div className={styles.overview}>
      <CharacterManagement />
    </div>
  );
}
