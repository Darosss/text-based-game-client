import { ChallengeDifficulty } from "./enums";

export type ChallengeData = {
  difficulty: ChallengeDifficulty;
  name: string;
};

export type ChoosenChallange = {
  id: string;
  timestamp: string;
};
