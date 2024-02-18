import { ItemType } from "./enums";
import {
  ItemWearable,
  ItemConsumable,
  InventoryItemType,
  ItemMercenary,
  CharacterTypesAlias,
  MercenaryCharacter,
} from "./types";

export const isWearableItem = (
  item: InventoryItemType
): item is ItemWearable => {
  return item.type !== ItemType.CONSUMABLE && item.type !== ItemType.MERCENARY;
};

export const isConsumableItem = (
  item: InventoryItemType
): item is ItemConsumable => {
  return item.type === ItemType.CONSUMABLE;
};

export const isMercenaryItem = (
  item: InventoryItemType
): item is ItemMercenary => {
  return item.type === ItemType.MERCENARY;
};

export const isMercenaryCharacter = (
  character: CharacterTypesAlias
): character is MercenaryCharacter => {
  return (character as MercenaryCharacter).mercenary !== undefined;
};
