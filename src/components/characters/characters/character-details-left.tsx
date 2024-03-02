import { UserContextProvider } from "@/components/user/user-context";
import { UserDetails } from "@/components/user/user-details";
import { Inventory } from "../inventory/inventory";
import { CharacterAvatar } from "./character-avatar";
import styles from "./character-management.module.scss";
import { useCharacterManagementContext } from "./character-management-context";

export const CharacterDetailsLeft = () => {
  const {
    apiInventory: {
      api: { data: inventoryData },
    },
  } = useCharacterManagementContext();
  return (
    <>
      <UserContextProvider>
        <div className={styles.userDetails}>
          <UserDetails />
        </div>
        <div className={styles.characterAvatar}>
          <CharacterAvatar />
        </div>
        <div className={styles.userInventory}>
          <Inventory data={inventoryData} />
        </div>
      </UserContextProvider>
    </>
  );
};
