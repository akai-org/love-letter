import { ReactNode, useState } from "react";
import { GameContext } from "./useGameContext";
import { GameState, GameStatus } from "../../types/Game";
import useRoomWebsockets from "./useRoomWebsockets";

const initialGameState: GameState = {
  id: "",
  name: "",
  status: GameStatus.NOT_STARTED,
  current_player: "",
  players: [],
  your_cards: [],
};

type GameProviderProps = {
  roomID: string;
  clientID: string;
  children: ReactNode;
};

/**
 * This is the top-level component for the Game. It provides the game state and
 * server status and functions to manage the server connection.
 */
export function GameProvider({
  children,
  roomID,
  clientID,
}: GameProviderProps) {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { status, listen, unlisten, send } = useRoomWebsockets(
    roomID,
    clientID,
    setGameState,
  );

  return (
    <>
      <GameContext.Provider
        value={{
          gameState: gameState,
          setGameState: setGameState,
          socketStatus: status,
          listen: listen,
          unlisten: unlisten,
          send: send,
        }}
      >
        {children}
      </GameContext.Provider>
    </>
  );
}
