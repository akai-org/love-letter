import { ReactNode, useState } from "react";
import { RoomContext } from "./useRoomContext";
import { GameState } from "../../types/Game";
import useRoom from "./useRoom";

const initialGameState: GameState = {
  id: "",
  name: "",
  status: "",
  current_player: "",
  players: [],
  cards: [],
};

type RoomProviderProps = { roomID: string; clientID: string; children: ReactNode };

/**
 * This is the top-level component for the Game. It provides the game state and
 * server status and functions to manage the server connection.
 */
export function GameProvider({ children, roomID, clientID }: RoomProviderProps) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { status, on, send } = useRoom(roomID, clientID, setGameState);

  return (
    <>
      <RoomContext.Provider
        value={{
          gameState: gameState,
          setGameState: setGameState,
          socketStatus: status,
          on,
          send,
        }}
      >
        {children}
      </RoomContext.Provider>
    </>
  );
}
