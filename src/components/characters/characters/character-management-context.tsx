import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseFetchReturnType, useFetch } from "@/hooks/useFetch";
import { CharacterTypesAlias, Inventory as InventoryType } from "@/api/types";

type CharacterManagementContextType = {
  apiInventory: UseFetchReturnType<InventoryType, unknown>;
  apiCharacter: UseFetchReturnType<CharacterTypesAlias, unknown>;
  currentCharacterIdState: [
    string | null,
    Dispatch<SetStateAction<string | null>>
  ];
};

type CharacterManagementContextProps = {
  children: React.ReactNode;
};

export const CharacterManagementContext =
  createContext<CharacterManagementContextType | null>(null);

export const CharacterManagementContextProvider = ({
  children,
}: CharacterManagementContextProps): React.JSX.Element => {
  const [currentCharacterId, setCurrentCharacterId] = useState<string | null>(
    null
  );
  const apiInventory = useFetch<InventoryType>({
    url: "your-inventory",
    method: "GET",
  });
  const { api, fetchData: fetchCharacterData } = useFetch<CharacterTypesAlias>(
    {
      url: `${
        !currentCharacterId
          ? "your-main-character"
          : `characters/${currentCharacterId}`
      }`,
      method: "GET",
    },
    { manual: currentCharacterId ? true : false }
  );

  useEffect(() => {
    if (currentCharacterId) fetchCharacterData();
  }, [currentCharacterId, fetchCharacterData]);

  return (
    <CharacterManagementContext.Provider
      value={{
        apiInventory,
        apiCharacter: { api, fetchData: fetchCharacterData },
        currentCharacterIdState: [currentCharacterId, setCurrentCharacterId],
      }}
    >
      {children}
    </CharacterManagementContext.Provider>
  );
};

export const useCharacterManagementContext =
  (): Required<CharacterManagementContextType> => {
    const characterManagementContext = useContext(CharacterManagementContext);
    if (!characterManagementContext) {
      throw new Error(
        "useCharacterManagementContext must be used within a CharacterManagementContextProvider"
      );
    }
    return characterManagementContext as CharacterManagementContextType;
  };
