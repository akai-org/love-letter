
import { GameState } from "./Game";
import { PlayerAction, PlayerActionPayload } from "./PlayerActions";
import { RoomEvent } from './RoomEvents';

// server status
export type SocketStatus = "connected" | "disconnected";

//websocket messages
export interface FromRoomMessage {
  event?: {
    type: RoomEvent,
    payload: Record<string, string>
  },

  state?: GameState
}

export interface ToRoomMessage<A extends PlayerAction> {
  action: {
    type: A,
    payload: PlayerActionPayload<A>,
  }
}