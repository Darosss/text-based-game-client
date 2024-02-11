import { createContext, useContext } from "react";
import { UseFetchReturnType, useFetch } from "@/hooks/useFetch";
import { Character, Inventory as InventoryType } from "@/api/types";

type CharacterManagementContextType = {
  apiInventory: UseFetchReturnType<InventoryType, unknown>;
  apiCharacter: UseFetchReturnType<Character, unknown>;
};

type CharacterManagementContextProps = {
  children: React.ReactNode;
};

export const CharacterManagementContext =
  createContext<CharacterManagementContextType | null>(null);

export const CharacterManagementContextProvider = ({
  children,
}: CharacterManagementContextProps): React.JSX.Element => {
  const apiInventory = useFetch<InventoryType>({
    url: "your-inventory",
    method: "GET",
  });
  const apiCharacter = useFetch<Character>({
    url: "your-main-character",
    method: "GET",
  });

  return (
    <CharacterManagementContext.Provider value={{ apiInventory, apiCharacter }}>
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
