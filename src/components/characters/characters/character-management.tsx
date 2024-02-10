import styles from "./character-management.module.scss";
import Image from "next/image";
import { Equipment } from "../equipment/equipment";
import { Inventory } from "@/components/characters/inventory/inventory";
import { CharacterManagementContextProvider } from "./character-management-context";

export const CharacterManagement = () => {
  return (
    <CharacterManagementContextProvider>
      <div className={styles.characterWrapper}>
        <div className={styles.characterDetailsLeft}>
          <div className={styles.characterAvatar}>
            <Image src="/images/hero-placeholder.png" alt="hero img" fill />
          </div>
          <div className={styles.userInventory}>
            <Inventory />
          </div>
        </div>
        <div className={styles.characterDetailsRight}>
          <div>
            <Equipment />
          </div>
        </div>
      </div>
    </CharacterManagementContextProvider>
  );
};
