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
  // hand: string;
  // myślę, że ujawnione karty powinny być wysyłane
  // za pomocą eventu, a nie w stanie
  killed: boolean;
  // alive: boolean; // moja propozycja
}

export const gameStatus = ['not_started', 'started', 'finished'] as const;
export type GameStatus = typeof gameStatus[number];

export interface GameState {
  id: string;
  name: string;
  status: GameStatus;
  current_player: string;
  players: Player[];
  your_cards: string[]; // id kart gracza
  played_cards: string[];
}