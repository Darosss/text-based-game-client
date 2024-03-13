import styles from "./character-management.module.scss";
import { FC, useState } from "react";
import { Equipment } from "../equipment";
import { Inventory, InventoryControlContextProvider } from "../inventory";
import { CharacterStatistics } from "./character-statistics";
import { useCharacterManagementContext } from "./character-management-context";
import { CharacterAvatar } from "./character-avatar";
import { Button } from "@/components/common";
import { Merchant, MerchantContextProvider } from "@/components/characters";

enum CurrentView {
  STATISTICS = "Statistics",
  MERCHANT = "Merchant",
}

export const CharacterManagement: FC = () => {
  const {
    apiInventory: {
      api: { data: inventoryData },
    },
  } = useCharacterManagementContext();
  const [currentView, setCurrentView] = useState<CurrentView>(
    CurrentView.STATISTICS
  );
  return (
    <div className={styles.characterWrapper}>
      <InventoryControlContextProvider>
        <div className={styles.avatar}>
          <CharacterAvatar />
        </div>
        <MerchantContextProvider>
          <div className={styles.inventory}>
            <Inventory data={inventoryData} />
          </div>
          <div className={styles.tab}>
            <div className={styles.tabNavigation}>
              {Object.values(CurrentView).map((view) => (
                <Button
                  key={view}
                  defaultButtonType={`${
                    currentView === view ? "success" : "info"
                  }`}
                  onClick={() => setCurrentView(view)}
                >
                  {view}
                </Button>
              ))}
            </div>
            <div className={styles.tabContent}>
              <TabView currentView={currentView} />
            </div>
          </div>
        </MerchantContextProvider>
        <div className={styles.equipment}>
          <Equipment />
        </div>
      </InventoryControlContextProvider>
    </div>
  );
};

type TabViewProps = {
  currentView: CurrentView;
};

const TabView = ({ currentView }: TabViewProps) => {
  switch (currentView) {
    case CurrentView.MERCHANT:
      return <Merchant />;
    case CurrentView.STATISTICS:
    default:
      return <CharacterStatistics />;
  }
};
