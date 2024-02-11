import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ItemType } from "@/api/enums";
import { Item } from "@/api/types";

//TODO: sort by add retrieve data sort by as default
export type SortByKeysType = keyof Pick<
  Item,
  "level" | "name" | "type" | "value" | "upgradePoints" | "weight"
>;

export type SortByType = {
  sortBy: SortByKeysType;
  descending: boolean;
};

export const sortByKeys: SortByKeysType[] = [
  "level",
  "name",
  "type",
  "value",
  "upgradePoints",
  "weight",
];

export type InventoryControlContext = {
  showType: ItemType[];
  name: string | null;
};

type InventoryControlContextType = {
  filter: InventoryControlContext;
  setFilter: Dispatch<SetStateAction<InventoryControlContext>>;
  sort: SortByType;
  setSort: Dispatch<SetStateAction<SortByType>>;
};

type InventoryControlContextProps = {
  children: React.ReactNode;
};

export const InventoryControlContext =
  createContext<InventoryControlContextType | null>(null);

export const InventoryControlContextProvider = ({
  children,
}: InventoryControlContextProps): React.JSX.Element => {
  const [filter, setFilter] = useState<InventoryControlContext>({
    name: null,
    showType: [],
  });
  const [sort, setSort] = useState<SortByType>({
    sortBy: "name",
    descending: true,
  });
  return (
    <InventoryControlContext.Provider
      value={{ filter, setFilter, sort, setSort }}
    >
      {children}
    </InventoryControlContext.Provider>
  );
};

export const useInventoryControlContext =
  (): Required<InventoryControlContextType> => {
    const inventoryControlContext = useContext(InventoryControlContext);
    if (!inventoryControlContext) {
      throw new Error(
        "useInventoryControlContext must be used within a InventoryControlContextProvider"
      );
    }
    return inventoryControlContext as InventoryControlContextType;
  };
