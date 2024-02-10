import { CharacterEquipmentFields } from "@/api/enums";

export type EquipmentDropResult = {
  dropEffect: string;
  name: CharacterEquipmentFields;
  characterId: string;
};

export type InventoryDropResult = {
  dropEffect: string;
};
