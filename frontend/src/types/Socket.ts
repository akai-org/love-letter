
import { GameState } from "./Game";
import { PlayerAction, PlayerActionPayload } from "./PlayerActions";
import { Event } from "./RoomEvents";

// server status
export enum SocketStatus {
  connecting = "connecting",
  connected = "connected",
  disconnected = "disconnected",
}

//websocket messages
export interface FromRoomMessage {
  events?: Event[];

  state?: GameState;
}

export interface ToRoomMessage<A extends PlayerAction> {
  action: {
    type: A,
    payload: PlayerActionPayload<A>,
  }
}