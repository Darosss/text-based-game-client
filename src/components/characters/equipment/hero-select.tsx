import { Button } from "@/components/common/button";
import { useFetch } from "@/hooks/useFetch";
import { useCharacterManagementContext } from "../characters/character-management-context";
export const HeroSelect = () => {
  const charactersIds = useFetch<string[]>({
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
      {charactersIds.api.responseData.data?.map((id, index) => {
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
    </>
  );
};
