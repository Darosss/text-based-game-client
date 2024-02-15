import { CharacterEquipmentFields, ItemType } from "@/api/enums";

export const equipmentFieldToItemType: Record<
  CharacterEquipmentFields,
  ItemType[]
> = {
  [CharacterEquipmentFields.HEAD]: [ItemType.HELMET],
  [CharacterEquipmentFields.LEFT_HAND]: [
    ItemType.WEAPON_MELEE,
    ItemType.WEAPON_RANGED,
    ItemType.SHIELD,
    ItemType.WEAPON_MELEE_TWO_HAND,
  ],
  [CharacterEquipmentFields.NECK]: [ItemType.NECKLACE],
  [CharacterEquipmentFields.RIGHT_HAND]: [
    ItemType.WEAPON_MELEE,
    ItemType.WEAPON_RANGED,
    ItemType.SHIELD,
    ItemType.WEAPON_MELEE_TWO_HAND,
  ],
  [CharacterEquipmentFields.CHEST]: [ItemType.CHEST_ARMOR],
  [CharacterEquipmentFields.ARMS]: [ItemType.GLOVES],
  [CharacterEquipmentFields.FOOTS]: [ItemType.BOOTS],
  [CharacterEquipmentFields.LEGS]: [ItemType.LEG_ARMOR],
  [CharacterEquipmentFields.L_RING_1]: [ItemType.RING],
  [CharacterEquipmentFields.L_RING_2]: [ItemType.RING],
  [CharacterEquipmentFields.R_RING_1]: [ItemType.RING],
  [CharacterEquipmentFields.R_RING_2]: [ItemType.RING],
};
