"use client";

import { CharacterManagement } from "@/components/characters";
import styles from "./overview.module.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CharacterManagementContextProvider } from "@/components/characters/characters/character-management-context";

export default function Overview() {
  return (
    <div className={styles.overview}>
      <DndProvider backend={HTML5Backend}>
        <CharacterManagementContextProvider>
          <CharacterManagement />
        </CharacterManagementContextProvider>
      </DndProvider>
    </div>
  );
}
