export interface Card {
  id: string;
  power: number;
  description: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  played_cards: string[];
  how_many_cards: number;
  alive: boolean;
  is_protected: boolean;
}

export enum GameStatus {
  NOT_STARTED = 'not_started',
  STARTED = 'started',
  FINISHED = 'finished',
}

export interface GameState {
  id: string;
  name: string;
  status: GameStatus;
  current_player: string;
  players: Player[];
  your_cards: string[];
}