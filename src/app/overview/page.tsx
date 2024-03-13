"use client";

import styles from "./overview.module.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  CharacterManagement,
  CharacterManagementContextProvider,
} from "@/components/characters";

export default function Overview() {
  return (
    <main className={styles.overview}>
      <DndProvider backend={HTML5Backend}>
        <CharacterManagementContextProvider>
          <CharacterManagement />
        </CharacterManagementContextProvider>
      </DndProvider>
    </main>
  );
}
