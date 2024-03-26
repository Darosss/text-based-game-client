"use client";

import styles from "./overview.module.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  CharacterManagement,
  CharacterManagementContextProvider,
} from "@/components/characters";
import { InventoryManagementContextProvider } from "@/components/characters/inventory";

export default function Overview() {
  return (
    <main className={styles.overview}>
      <DndProvider backend={HTML5Backend}>
        <InventoryManagementContextProvider>
          <CharacterManagementContextProvider>
            <CharacterManagement />
          </CharacterManagementContextProvider>
        </InventoryManagementContextProvider>
      </DndProvider>
    </main>
  );
}
