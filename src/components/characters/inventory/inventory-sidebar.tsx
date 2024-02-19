import { ItemType } from "@/api/enums";
import styles from "./inventory-sidebar.module.scss";
import { Button } from "@/components/common/button";
import { useInventoryControlContext } from "./inventory-control-context";
import Image from "next/image";
export const InventorySidebar = () => {
  const { filter, setFilter } = useInventoryControlContext();
  return (
    <div className={styles.sidebarWrapper}>
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
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 50vw, 50vw"
              alt="item"
              fill
            />
          </Button>
        );
      })}
    </div>
  );
};
