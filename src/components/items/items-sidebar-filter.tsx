import { ItemType } from "@/api/enums";
import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../common/button";
import Image from "next/image";
import styles from "./items-sidebar-filter.module.scss";
import { FilterType } from "./types";

type ItemsSidebarFilterProps = {
  filter: FilterType;
  setFilter: Dispatch<SetStateAction<FilterType>>;
};

export const ItemsSidebarFilter: FC<ItemsSidebarFilterProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className={styles.itemsSidebarFilterWrapper}>
      {Object.values(ItemType).map((type) => {
        const isChoosen = filter?.showType?.includes(type);
        return (
          <Button
            key={type}
            style={{ fontSize: "1dvw", width: "100%" }}
            defaultButtonType={isChoosen ? "success" : "info"}
            onClick={() => {
              setFilter((prevState) => {
                let newShowType: ItemType[] = [];
                if (isChoosen) {
                  newShowType = prevState.showType.filter((filterType) => {
                    return filterType !== type;
                  });
                } else {
                  newShowType = [...prevState.showType, type];
                }

                return {
                  ...prevState,
                  showType: newShowType,
                };
              });
            }}
          >
            <Image
              src={`/images/inventory/navigation/${type.toLowerCase()}.png`}
              sizes="(max-width: 768px) 15vw, (max-width: 1200px) 25vw, 33vw"
              alt="item"
              fill
            />
          </Button>
        );
      })}
    </div>
  );
};
