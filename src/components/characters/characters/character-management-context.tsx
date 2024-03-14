import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { UseFetchReturnType, useFetch } from "@/hooks/useFetch";
import { CharacterTypesAlias, Inventory as InventoryType } from "@/api/types";
import { CharacterCreator } from "../creator";
import { ApiDataNotNullable } from "@/api/fetch";
import { FetchingInfo } from "@/components/common";

type ApiCharacter = ApiDataNotNullable<CharacterTypesAlias>;
type ApiInventory = ApiDataNotNullable<InventoryType>;

type ApiStateType<ApiData, FetchResponseData, FetchBodyData = unknown> = {
  api: ApiData;
  fetchData: UseFetchReturnType<FetchResponseData, FetchBodyData>["fetchData"];
};

type ApiInventoryType = ApiStateType<ApiInventory, InventoryType>;
type ApiCharacterType = ApiStateType<ApiCharacter, CharacterTypesAlias>;

type CharacterManagementContextType = {
  apiInventory: ApiInventoryType;
  apiCharacter: ApiCharacterType;
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

export const CharacterManagementContextProvider: FC<
  CharacterManagementContextProps
> = ({ children }) => {
  const [currentCharacterId, setCurrentCharacterId] = useState<string | null>(
    null
  );
  const { api: inventoryApi, fetchData: fetchInventoryData } =
    useFetch<InventoryType>({
      url: "your-inventory",
      method: "GET",
    });
  const { api: characterApi, fetchData: fetchCharacterData } =
    useFetch<CharacterTypesAlias>(
      {
        url: `${
          !currentCharacterId
            ? "characters/your-main-character"
            : `characters/${currentCharacterId}`
        }`,
        method: "GET",
      },
      { manual: currentCharacterId ? true : false }
    );

  useEffect(() => {
    if (currentCharacterId) fetchCharacterData();
  }, [currentCharacterId, fetchCharacterData]);

  //TODO: make it better later.
  if (
    characterApi.isPending === null ||
    characterApi.error ||
    !characterApi.responseData.data ||
    inventoryApi.isPending === null ||
    inventoryApi.error ||
    !inventoryApi.responseData.data
  ) {
    return (
      <FetchingInfo
        isPending={characterApi.isPending}
        error={`${characterApi.error ? characterApi.error + " " : ""}${
          inventoryApi.error || ""
        }`}
        refetch={() => {
          characterApi.error ? fetchCharacterData() : null;
          inventoryApi.error ? fetchInventoryData() : null;
        }}
      />
    );
  }

  return (
    <CharacterManagementContext.Provider
      value={{
        apiInventory: {
          api: inventoryApi.responseData as ApiInventory,
          fetchData: fetchInventoryData,
        },
        apiCharacter: {
          api: characterApi.responseData as ApiCharacter,
          fetchData: fetchCharacterData,
        },
        currentCharacterIdState: [currentCharacterId, setCurrentCharacterId],
      }}
    >
      {characterApi.responseData.data ? children : <CharacterCreator />}
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
