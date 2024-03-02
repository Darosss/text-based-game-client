import styles from "./character-management.module.scss";
import { Equipment } from "../equipment/equipment";
import { CharacterManagementContextProvider } from "./character-management-context";
import { InventoryControlContextProvider } from "../inventory/inventory-control-context";
import { CharacterStatistics } from "./character-statistics";
import { CharacterDetailsLeft } from "./character-details-left";

export const CharacterManagement = () => {
  return (
    <CharacterManagementContextProvider>
      <div className={styles.characterWrapper}>
        <InventoryControlContextProvider>
          <div className={styles.characterDetailsLeft}>
            <CharacterDetailsLeft />
          </div>
          <div className={styles.characterDetailsRight}>
            <div className={styles.equipment}>
              <Equipment />
            </div>
            <div className={styles.statistics}>
              <CharacterStatistics />
            </div>
          </div>
        </InventoryControlContextProvider>
      </div>
    </CharacterManagementContextProvider>
  );
};
