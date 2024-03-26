"use client";

import {
  CharacterManagementContextProvider,
  OtherUserCharacter,
} from "@/components/characters";
import { useParams } from "next/navigation";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function UserOverview() {
  const userId = useParams().id;

  return (
    <main>
      {/* TODO: remove dnd provider, after refactoring components
        components for viewing others users equipment / stats should not have
        dnd
      */}
      <DndProvider backend={HTML5Backend}>
        <CharacterManagementContextProvider>
          <OtherUserCharacter userId={String(userId)} />
        </CharacterManagementContextProvider>
      </DndProvider>
    </main>
  );
}
