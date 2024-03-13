import { Button } from "@/components/common/button";
import { useFetch } from "@/hooks/useFetch";
import { useCharacterManagementContext } from "../characters/character-management-context";
import { HeroMercenaryCreate } from "./hero-mercenary-create";
import { FC } from "react";

//TODO: this will be from configs from backend latter.
const MAX_CHARACTERS_PER_USER = 4;

export const HeroSelect: FC = () => {
  const {
    api: {
      responseData: { data: charactersIdsData },
    },
    fetchData: fetchCharactersIds,
  } = useFetch<string[]>({
    url: "your-characters-ids",
    method: "GET",
  });
  const {
    currentCharacterIdState: [, setCurrentCharacterId],
    apiCharacter: {
      api: { data },
    },
  } = useCharacterManagementContext();
  return (
    <>
      {charactersIdsData?.map((id, index) => {
        const asCurrentChar = data?.id === id;
        return (
          <Button
            key={id}
            defaultButtonType={`${asCurrentChar ? "success" : "primary"}`}
            onClick={() => setCurrentCharacterId(id)}
          >
            Hero {index + 1}
          </Button>
        );
      })}
      {(charactersIdsData?.length || 0) < MAX_CHARACTERS_PER_USER ? (
        <HeroMercenaryCreate onCreateMercenary={fetchCharactersIds} />
      ) : null}
    </>
  );
};
