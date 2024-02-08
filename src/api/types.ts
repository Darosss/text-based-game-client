import { EnemyType, FightReportStatus } from "./enums";

export type NpcEnemy = {
  health: number;
  id: { date: string; timestamp: number };
  level: number;
  name: string;
  type: EnemyType;
  stats: HeroStats;
};

export type Character = {
  equipment: any;
  experience: number;
  health: number;
  id: { date: string; timestamp: number };
  level: number;
  mainCharacter: boolean;
  name: string;
  stats: HeroStats;
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

export type Item = {
  name: string;
  description: string;
  level: number;
  id: { date: string; timestamp: number };
  nameWithPrefixAndSuffix: string;
  prefix: string;
  suffix: string;
  rarity: string; //TODO: later enum / types
  statistics: ItemStatistics;
  type: string; //TODO: later enum / types
  upgradePoints: number;
  value: number;
  weight: number;
};

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
