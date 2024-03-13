"use client";

import { useFetch } from "@/hooks/useFetch";
import styles from "./character-creator.module.scss";
import { Button } from "@/components/common";
import { FC, useEffect } from "react";
import { useCharacterManagementContext } from "@/components/characters";

/* TODO: 
here i need to add later:
- character profession
- character sex
etc, itp
for now it's just create button 

*/

export const CharacterCreator: FC = () => {
  const {
    apiCharacter: { fetchData: fetchCharacterData },
  } = useCharacterManagementContext();

  const {
    api: { responseData },
    fetchData,
  } = useFetch(
    { url: "characters/create", method: "POST" },
    {
      manual: true,
      notification: { pendingText: "Trying to create main character" },
    }
  );

  useEffect(() => {
    if (responseData.data) fetchCharacterData();
  }, [responseData.data, fetchCharacterData]);

  return (
    <div className={styles.characterCreatorWrapper}>
      <h1>Char creator</h1>

      <div>
        <Button onClick={fetchData}>Create main character</Button>
      </div>
    </div>
  );
};
