import { RoomEvent } from './RoomEvents';

export interface Event {
  type: RoomEvent;
  payload: string[];
}

// game events from server
export enum RoomEvent {
  NEW_ROUND = "NEW_ROUND",
  ROUND_OVER = "ROUND_OVER",
  TURN = "TURN",
  YOUR_TURN = "YOUR_TURN",
  NEW_CARD = "NEW_CARD",
  PLAYED = "PLAYED",
  PLAY_ACCEPTED = "PLAY_ACCEPTED",
  PLAY_REJECTED = "PLAY_REJECTED",
  AUTOPLAYED = "AUTOPLAYED",
  KILLED = "KILLED",
  TIMEUP = "TIMEUP",
  GOT_POINT = "GOT_POINT",
  WINNER = "WINNER",
  SHOW_CARD = "SHOW_CARD",
  REMOVE_CARD = "REMOVE_CARD",
  PROTECTED = "PROTECTED",
}

export type RoomEventListener<T extends RoomEvent> =
  T extends RoomEvent.NEW_ROUND ? () => void :
  T extends RoomEvent.ROUND_OVER ? () => void :
  T extends RoomEvent.TURN ? (player: string) => void :
  T extends RoomEvent.YOUR_TURN ? (time: number) => void :
  T extends RoomEvent.NEW_CARD ? (card: string) => void :
  T extends RoomEvent.PLAYED ? (player: string, card: string) => void :
  T extends RoomEvent.PLAY_ACCEPTED ? () => void :
  T extends RoomEvent.PLAY_REJECTED ? () => void :
  T extends RoomEvent.AUTOPLAYED ? (card: string) => void :
  T extends RoomEvent.KILLED ? (player: string) => void :
  T extends RoomEvent.TIMEUP ? (player: string) => void :
  T extends RoomEvent.GOT_POINT ? (player: string, reason: string) => void :
  T extends RoomEvent.WINNER ? (player: string) => void :
  T extends RoomEvent.SHOW_CARD ? (player: string, card: string) => void :
  T extends RoomEvent.REMOVE_CARD ? (card: string) => void :
  T extends RoomEvent.PROTECTED ? (player: string) => void : never;

export type RoomEventsListeners = { [U in RoomEvent]: RoomEventListener<RoomEvent>[] };