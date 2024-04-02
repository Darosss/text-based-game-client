import styles from "./character-management.module.scss";
import { FC, useEffect, useMemo, useState } from "react";
import { Equipment } from "../equipment";
import {
  Inventory,
  InventoryControlContextProvider,
  useInventoryManagementContext,
} from "../inventory";
import { CharacterStatistics } from "./character-statistics";
import { CharacterAvatar } from "./character-avatar";
import { Button } from "@/components/common";
import {
  Merchant,
  MerchantContextProvider,
  useCharacterManagementContext,
} from "@/components/characters";
import { isMercenaryCharacter } from "@/api/utils";
import { TrainCharacterStatistics } from "./train-character-statistics";

enum CurrentView {
  STATISTICS = "Statistics",
  BASE_STATISTICS_TRAIN = "Train statistics",
  MERCHANT = "Merchant",
}

export const CharacterManagement: FC = () => {
  const {
    api: { data: inventoryData },
  } = useInventoryManagementContext();

  const {
    api: { data },
    fetchData,
  } = useCharacterManagementContext();

  const [currentView, setCurrentView] = useState<CurrentView>(
    CurrentView.STATISTICS
  );

  const mercenaryCharacter = useMemo(() => isMercenaryCharacter(data), [data]);

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
              {Object.values(CurrentView).map((view) =>
                mercenaryCharacter &&
                view === CurrentView.BASE_STATISTICS_TRAIN ? null : (
                  <Button
                    key={view}
                    defaultButtonType={`${
                      currentView === view ? "success" : "info"
                    }`}
                    onClick={() => setCurrentView(view)}
                  >
                    {view}
                  </Button>
                )
              )}
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

    case CurrentView.BASE_STATISTICS_TRAIN:
      return <TrainCharacterStatistics />;

    case CurrentView.STATISTICS:
    default:
      return <CharacterStatistics />;
  }
};
