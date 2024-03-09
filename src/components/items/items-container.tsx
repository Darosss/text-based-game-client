import { Dispatch, SetStateAction } from "react";
import styles from "./items-container.module.scss";
import { ItemsHeaderFilter } from "./items-header-filter";
import { ItemsSidebarFilter } from "./items-sidebar-filter";
import { FilterType, SortType } from "./types";

type ItemsContainerProps = {
  children: React.ReactNode;
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
  sort: SortType;
  setSort: Dispatch<SetStateAction<SortType>>;
  className?: string;
};

export const ItemsContainer = ({
  children,
  filter,
  setFilter,
  sort,
  setSort,
  className,
}: ItemsContainerProps) => {
  return (
    <div
      className={`${styles.itemsContainerWrapper} ${
        className ? className : ""
      }`}
    >
      <div className={styles.headerMenu}>
        <ItemsHeaderFilter
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
        />
      </div>
      <div className={styles.children}>{children} </div>

      <div className={styles.sidebar}>
        <ItemsSidebarFilter filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
};
