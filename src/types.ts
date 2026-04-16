export type GameMode = '301' | 'High Score';
export type PlayerCount = 1 | 2;

export interface Player {
  id: number;
  name: string;
  score: number;
  history: number[][]; // Each turn is an array of up to 3 dart scores
}

export interface GameState {
  mode: GameMode;
  playerCount: PlayerCount;
  players: Player[];
  currentPlayerIndex: number;
  status: 'setup' | 'playing' | 'finished';
  winner: Player | null;
  currentTurnDarts: number[];
  maxRounds: number;
  currentRound: number;
}
