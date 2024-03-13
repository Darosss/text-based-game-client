import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "@/components/common";
import { FilterType, SortByKeysType, SortType } from "./types";
import styles from "./items-header-filter.module.scss";

enum CurrentView {
  SEARCH = "SEARCH",
  SORT = "SORT",
}

type ItemsHeaderFilterProps = {
  setFilter: Dispatch<SetStateAction<FilterType>>;
  sort: SortType;
  setSort: Dispatch<SetStateAction<SortType>>;
};

export const sortByKeys: SortByKeysType[] = [
  "level",
  "name",
  "type",
  "value",
  "upgradePoints",
  "weight",
];

const AscendingArrow: FC = () => <span>&#9650;</span>;
const DescendingArrow: FC = () => <span>&#9660;</span>;

export const ItemsHeaderFilter: FC<ItemsHeaderFilterProps> = ({
  setFilter,
  sort,
  setSort,
}) => {
  const [view, setView] = useState<CurrentView>(CurrentView.SEARCH);

  return (
    <div className={styles.itemsHeaderFilterWrapper}>
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
