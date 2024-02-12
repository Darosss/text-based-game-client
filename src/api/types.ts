import {
  CharacterEquipmentFields,
  EnemyType,
  FightReportStatus,
  ItemType,
} from "./enums";

type CommonFieldTypes = {
  id: string;
  //TODO: createdAt updatedAt and others?
};

export type NpcEnemy = CommonFieldTypes & {
  health: number;
  level: number;
  name: string;
  type: EnemyType;
  stats: HeroStats;
};

export type Character = CommonFieldTypes & {
  equipment: CharacterEquipment;
  experience: number;
  health: number;
  level: number;
  mainCharacter: boolean;
  name: string;
  stats: HeroStats;
};

export type CharacterEquipment = CommonFieldTypes & {
  slots: CharacterEquipmentSlots;
};

export type CharacterEquipmentSlots = {
  [slot in CharacterEquipmentFields]?: Item;
};

export type HeroStats = {
  additionalStatistics: HeroAdditionalStatistics;
  statistics: HeroBaseStatistics;
};
export type HeroAdditionalStatistics = {
  [name: string]: HeroAdditionalStatisticsValues;
};

export type HeroStatisticsCommon = {
  bonus: number;
  effectiveValue: number;
  name: string;
  bonusPercentage: number;
};

export type HeroAdditionalStatisticsValues = HeroStatisticsCommon & {
  baseStatBonus: number;
  value: number;
};

export type HeroBaseStatistics = {
  [name: string]: HeroBaseStatisticsValues;
};

export type HeroBaseStatisticsValues = HeroStatisticsCommon & {
  max: number;
};

export type ReportTurn = {
  turnNumber: number;
  actions: ReportTurnAction[];
  endOfFight: boolean;
};

export type ReportTurnAction = {
  basicAttack: ReportTurnActionMove;
  doubledAttack: ReportTurnActionMove;
};

export type ReportTurnActionMove = {
  attack: ReportTurnActionMoveAttack;
  defend: ReportTurnActionMoveDefend;
};

export type ReportTurnActionMoveAttack = {
  baseValues: {
    attackStrength: "NORMAL" | "CRITIC";
    value: number;
    percentBonusDamage: number;
  };
  debuffs: any;
  name: string;
  withDoubledAttack: boolean;
};
export type ReportTurnActionMoveDefend = {
  defendType: "DODGED" | "BLOCKED" | "PAIRED" | "NULL";
  health: number;
  name: string;
  receivedDamage: number;
  parryAttack: ReportTurnAction | null;
};

export type Item = CommonFieldTypes & {
  name: string;
  description: string;
  level: number;
  nameWithPrefixAndSuffix: string;
  prefix: string;
  suffix: string;
  rarity: ItemRarity;
  statistics: ItemStatistics;
  type: ItemType;
  upgradePoints: number;
  value: number;
  weight: number;
};

export type ItemRarity =
  | "COMMON"
  | "UNCOMMON"
  | "RARE"
  | "VERY_RARE"
  | "EPIC"
  | "LEGENDARY"
  | "MYTHIC";

export type ItemStatistics = {
  //TODO: here shoould be an enum or type depends on statistic
  baseStatistics: ItemStatisticStatsList<string>;
  additionalStatistics: ItemStatisticStatsList<string>;
};

export type ItemStatisticStatsList<NameType extends string> = {
  [name in NameType]: ItemStatisticsValues;
};

export type ItemStatisticsValues = {
  name: string; //TODO: later generic? with enum
  percentageValue: number;
  value: number;
};

export type FightReportType = {
  characters: Character[];
  enemies: NpcEnemy[];
  gainedExperience: number;
  loot: Item[];
  status: FightReportStatus;
  turnsReports: ReportTurn[];
};

export type Inventory = CommonFieldTypes & {
  items?: InventoryItems;
  maxItems: number;
  maxWeight: number;
  currentWeight: number;
};

export type InventoryItems = {
  [id: string]: Item;
};

export type EquipResponseType = {
  success: boolean;
  message: string;
};

export type UnEquipResponseType = EquipResponseType & {
  item: Item | null;
};
