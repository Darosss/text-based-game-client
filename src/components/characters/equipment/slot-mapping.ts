import { CharacterEquipmentFields, ItemType } from "@/api/enums";

export const equipmentFieldToItemType: Record<
  CharacterEquipmentFields,
  ItemType[]
> = {
  [CharacterEquipmentFields.HEAD]: [ItemType.HELMET],
  [CharacterEquipmentFields.LEFT_HAND]: [
    ItemType.WEAPON_MELEE,
    ItemType.WEAPON_RANGED,
  ],
  [CharacterEquipmentFields.NECK]: [ItemType.NECKLACE],
  [CharacterEquipmentFields.RIGHT_HAND]: [
    ItemType.WEAPON_MELEE,
    ItemType.WEAPON_RANGED,
  ],
  [CharacterEquipmentFields.CHEST]: [ItemType.CHEST_ARMOR],
  [CharacterEquipmentFields.ARMS]: [ItemType.GLOVES],
  [CharacterEquipmentFields.FOOTS]: [ItemType.BOOTS],
};
