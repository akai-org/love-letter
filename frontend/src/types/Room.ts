// room status

export enum RoomStatus {
  Waiting = 'waiting',
  Playing = 'playing',
  Over = 'over',
}

// room type
export type Room = {
  game_id: string;
  players: number;
  max_players: number;
};