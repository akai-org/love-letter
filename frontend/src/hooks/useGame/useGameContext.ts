import { createContext, useContext } from "react";
import { GameState, GameStatus } from "../../types/Game";
import { RoomEvent, RoomEventListener } from "../../types/RoomEvents";
import { SocketStatus } from "../../types/Socket";
import { PlayerAction, PlayerActionPayload } from "../../types/PlayerActions";

export interface GameContextType {
  /** Current game state */
  gameState: GameState;
  /** Method to set the game state */
  setGameState: (newState: GameState) => void;

  /** Status of the connection to the server */
  socketStatus: SocketStatus;

  /** Method to register a callback for a specific event */
  listen: <T extends RoomEvent>(event: T, callback: RoomEventListener<T>) => void;
  /** Method to unregister a callback for a specific event */
  unlisten: <U extends RoomEvent>([event, id]: readonly [U, number]) => void;

  /** Method to send an action to the server */
  send: <A extends PlayerAction>(type: A, payload: PlayerActionPayload<A>) => void;
}

export const initialroomContext: GameContextType = {
  gameState: {
    id: "",
    name: "",
    status: GameStatus.NOT_STARTED,
    current_player: "",
    players: [],
    your_cards: [],
  },
  setGameState: () => { },

  socketStatus: SocketStatus.disconnected,
  listen: () => { },
  unlisten: () => { },
  send: () => { },
};

export const GameContext = createContext<GameContextType>(initialroomContext);

/**
 * Custom hook to manage the game state and the connection to the room.
 * 
 * @returns GameContext
 * @throws Error if used outside of a GameProvider
 * 
 * @example
 * const { gameState, socketStatus, on, send } = useGame();
 */

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (context === undefined) throw new Error("useGame must be used within a GameProvider");
  return context;
}
