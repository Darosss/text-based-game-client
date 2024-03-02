import styles from "./character-management.module.scss";
import { Equipment } from "../equipment/equipment";
import { Inventory } from "@/components/characters/inventory/inventory";
import { CharacterManagementContextProvider } from "./character-management-context";
import { InventoryControlContextProvider } from "../inventory/inventory-control-context";
import { CharacterStatistics } from "./character-statistics";
import { CharacterAvatar } from "./character-avatar";
import { UserDetails } from "@/components/user/user-details";
import { UserContextProvider } from "@/components/user/user-context";

export const CharacterManagement = () => {
  return (
    <CharacterManagementContextProvider>
      <div className={styles.characterWrapper}>
        <InventoryControlContextProvider>
          <div className={styles.characterDetailsLeft}>
            <UserContextProvider>
              <div className={styles.userDetails}>
                <UserDetails />
              </div>
              <div className={styles.characterAvatar}>
                <CharacterAvatar />
              </div>
              <div className={styles.userInventory}>
                <Inventory />
              </div>
            </UserContextProvider>
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
