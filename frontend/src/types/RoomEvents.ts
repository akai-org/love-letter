
export interface Event {
  type: RoomEvent;
  payload: string[];
}

// game events from server
export const roomEvents = [
  'NEW_ROUND',
  'ROUND_OVER',
  'TURN',
  'YOUR_TURN',

  'NEW_CARD',
  'PLAYED',
  'PLAY_ACCEPTED',
  'PLAY_REJECTED',
  'AUTOPLAYED',
  'KILLED',
  'TIMEUP',

  'GOT_POINT',
  'WINNER',

  'SHOW_CARD',
  'REMOVE_CARD',
  'PROTECTED',

  'ONLY_ALIVE',
  'SPY',
] as const;
export type RoomEvent = typeof roomEvents[number];

export type RoomEventListener<T extends RoomEvent> =
  T extends "NEW_ROUND" ? (payload: undefined) => void :
  T extends "ROUND_OVER" ? (payload: undefined) => void :
  T extends "TURN" ? (payload: { player: string }) => void :
  T extends "YOUR_TURN" ? (payload: { time: number }) => void :
  T extends "NEW_CARD" ? (payload: { card: string }) => void :
  T extends "PLAYED" ? (payload: { player: string, card: string }) => void :
  T extends "PLAY_ACCEPTED" ? (payload: undefined) => void :
  T extends "PLAY_REJECTED" ? (payload: undefined) => void :
  T extends "AUTOPLAYED" ? (payload: { card: string }) => void :
  T extends "KILLED" ? (payload: { player: string }) => void :
  T extends "TIMEUP" ? (payload: { player: string }) => void :
  T extends "GOT_POINT" ? (payload: { player: string, reason: string }) => void :
  T extends "WINNER" ? (payload: { player: string }) => void :
  T extends "SHOW_CARD" ? (payload: { player: string, card: string }) => void :
  T extends "REMOVE_CARD" ? (payload: { card: string }) => void :
  T extends "PROTECTED" ? (payload: { player: string }) => void :
  T extends "ONLY_ALIVE" ? (payload: { player: string }) => void :
  T extends "SPY" ? (payload: { player: string }) => void : never;

export type RoomEventsListeners = { [U in RoomEvent]: RoomEventListener<RoomEvent>[] };