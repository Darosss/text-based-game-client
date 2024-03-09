import { CharacterEquipmentFields } from "@/api/enums";

export type BaseDropResult = {
  dropAction: string;
};

export type EquipmentDropResult = BaseDropResult & {
  name: CharacterEquipmentFields;
  characterId: string;
};
