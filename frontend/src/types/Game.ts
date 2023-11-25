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
  hand: string[];
}

export interface GameState {
  id: string;
  name: string;
  status: string;
  current_player: string;
  players: Player[];
  cards: Card[];
}