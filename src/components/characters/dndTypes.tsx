import { CharacterEquipmentFields, ItemType } from "@/api/enums";
import { PossibleDropResultActions } from "./equipment/enums";

export type BaseDropResult<T extends PossibleDropResultActions> = {
  dropAction: T;
};

type BaseDragObjectItem = {
  id: string;
  name: string;
};

export type BaseEquipmentFieldDropResult =
  BaseDropResult<PossibleDropResultActions.EQUIP_ITEM> & {
    name: CharacterEquipmentFields;
    characterId: string;
  };

export type MercenaryEquipmentFieldDropResult =
  BaseDropResult<PossibleDropResultActions.EQUIP_MERCENARY> & {
    characterId: string;
  };

export type DragObjectInventoryItem = BaseDragObjectItem & {
  type: ItemType;
};

export type BaseDropResultsFromInventory = BaseDropResult<
  PossibleDropResultActions.CONSUME | PossibleDropResultActions.SELL_ITEM
>;

export type DropResultAsInventoryItem =
  | BaseDropResultsFromInventory
  | BaseEquipmentFieldDropResult
  | MercenaryEquipmentFieldDropResult;

export type DragBaseCollectedProps = {
  opacity: number;
};

export type UseDropBaseCollectedProps = {
  isOver: boolean;
  canDrop: boolean;
};

export type DropResultAsMerchantItem =
  BaseDropResult<PossibleDropResultActions.BUY_ITEM>;

//Note: this in case when i will need adjust dropping other things into inventory / merchant / equipment etc
export type InventoryDropResult =
  | DropResultAsEquipmentItem
  | DropResultAsMerchantItem
  | DropResultAsMercenaryItem;

export type DragObjectMerchantItem = BaseDragObjectItem;

export type DropResultAsEquipmentItem =
  BaseDropResult<PossibleDropResultActions.UN_EQUIP_ITEM>;

export type DropResultAsMercenaryItem =
  BaseDropResult<PossibleDropResultActions.UN_EQUIP_MERCENARY>;
// ***

//Note: here i need this, because for now inventory is the only place where multiple items can be dropped
export type DropDragObjectIntoInventory = BaseDragObjectItem &
  BaseDropResult<
    | PossibleDropResultActions.BUY_ITEM
    | PossibleDropResultActions.UN_EQUIP_ITEM
    | PossibleDropResultActions.UN_EQUIP_MERCENARY
  >;
