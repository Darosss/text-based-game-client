export type CompletedDungeons = {
  level: number;
  finished: string;
};

export type DungeonsResponse = {
  currentLevel: number;
  canFightDate: string;
  completedDungeons: CompletedDungeons[];
};
