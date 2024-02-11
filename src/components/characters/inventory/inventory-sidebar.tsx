import { ItemType } from "@/api/enums";
import styles from "./inventory-sidebar.module.scss";
import { Button } from "@/components/common/button";
import { useInventoryControlContext } from "./inventory-control-context";
export const InventorySidebar = () => {
  const { filter, setFilter } = useInventoryControlContext();
  return (
    <div className={styles.sidebarWrapper}>
      {Object.values(ItemType).map((type) => {
        const isChoosen = filter?.showType?.includes(type);
        //TODO: add images icons. for now font size smaller.
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
            {type}
          </Button>
        );
      })}
    </div>
  );
};
