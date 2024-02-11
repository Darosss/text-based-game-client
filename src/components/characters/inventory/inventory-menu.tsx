import styles from "./inventory-menu.module.scss";
import {
  SortByKeysType,
  sortByKeys,
  useInventoryControlContext,
} from "./inventory-control-context";
import { useState } from "react";
import { Button } from "@/components/common/button";

enum CurrentView {
  SEARCH = "SEARCH",
  SORT = "SORT",
}
const AscendingArrow = () => <span>&#9650;</span>;
const DescendingArrow = () => <span>&#9660;</span>;

export const InventoryMenu = () => {
  const [view, setView] = useState<CurrentView>(CurrentView.SEARCH);
  const { setFilter, sort, setSort } = useInventoryControlContext();

  return (
    <div className={styles.inventoryMenuWrapper}>
      {view === CurrentView.SEARCH ? (
        <>
          Search
          <input
            type="search"
            onChange={(e) =>
              setFilter((prevState) => ({
                ...prevState,
                name: e.target.value.toLowerCase(),
              }))
            }
          />
        </>
      ) : (
        <>
          Sort by
          <select
            onChange={(e) =>
              setSort((prevState) => ({
                ...prevState,
                sortBy: e.target.value as SortByKeysType,
              }))
            }
          >
            {sortByKeys.map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
          <Button
            onClick={() =>
              setSort((prevState) => ({
                ...prevState,
                descending: !prevState.descending,
              }))
            }
          >
            {sort.descending ? <DescendingArrow /> : <AscendingArrow />}
          </Button>
        </>
      )}
      <Button
        defaultButtonType="info"
        onClick={() =>
          setView((prevView) =>
            prevView === CurrentView.SEARCH
              ? CurrentView.SORT
              : CurrentView.SEARCH
          )
        }
      >
        {view === CurrentView.SEARCH ? CurrentView.SORT : CurrentView.SEARCH}
      </Button>
    </div>
  );
};
