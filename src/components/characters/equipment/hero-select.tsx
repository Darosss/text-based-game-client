import { Button } from "@/components/common";
import { useFetch } from "@/hooks/useFetch";
import { HeroMercenaryCreate } from "./hero-mercenary-create";
import { FC, useEffect } from "react";

//TODO: this will be from configs from backend latter.
const MAX_CHARACTERS_PER_USER = 4;

type HeroSelectProps = {
  currentCharacterId: string | null;
  setCurrentCharacterId: (id: string) => void;
  userId?: string;
};

export const HeroSelect: FC<HeroSelectProps> = ({
  currentCharacterId,
  setCurrentCharacterId,
  userId,
}) => {
  const {
    api: {
      responseData: { data: charactersIdsData },
    },
    fetchData: fetchCharactersIds,
  } = useFetch<string[]>({
    url: `${
      userId
        ? `characters/user/${userId}/characters-ids`
        : "characters/your-characters-ids"
    }`,
    method: "GET",
  });

  useEffect(() => {
    const firstCharacter = charactersIdsData?.at(0);
    if (userId && firstCharacter) setCurrentCharacterId(firstCharacter);
  }, [charactersIdsData, setCurrentCharacterId, userId]);

  return (
    <>
      {charactersIdsData?.map((id, index) => {
        const asCurrentChar = currentCharacterId === id;
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
      {(charactersIdsData?.length || 0) < MAX_CHARACTERS_PER_USER && !userId ? (
        <HeroMercenaryCreate onCreateMercenary={fetchCharactersIds} />
      ) : null}
    </>
  );
};
