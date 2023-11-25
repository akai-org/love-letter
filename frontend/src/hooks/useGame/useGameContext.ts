import { createContext, useContext } from "react";
import { GameState } from "../../types/Game";
import { PlayerAction, PlayerActionPayload, RoomEvent, RoomEventListener, SocketStatus } from "../../types/Room";

export interface GameContextType {
  /** Current game state */
  gameState: GameState;
  /** Method to set the game state */
  setGameState: (newState: GameState) => void;

  /** Status of the connection to the server */
  socketStatus: SocketStatus;

  /** Method to register a callback for a specific event */
  on: <T extends RoomEvent>(event: T, callback: RoomEventListener<T>) => void;
  /** Method to send a message to the server */
  send: <T extends PlayerAction>(action: T, payload: PlayerActionPayload<T>) => void;
}

export const initialroomContext: GameContextType = {
  gameState: {
    id: "",
    name: "",
    status: "",
    current_player: "",
    players: [],
    cards: [],
  },
  setGameState: () => { },

  socketStatus: "disconnected",
  on: () => { },
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
 * const { gameState, setGameState, socketStatus, on, send } = useGame();
 */

export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (context === undefined) throw new Error("useGame must be used within a GameProvider");
  return context;
}
