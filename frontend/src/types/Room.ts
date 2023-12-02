// room status
export const roomStatuses = ['waiting', 'playing', 'over'] as const;
export type RoomStatus = typeof roomStatuses[number];

// room type
export type Room = {
  game_id: string;
  players: number;
  max_players: number;
};