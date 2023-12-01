import { useEffect } from "react";
import { useGame } from "../../hooks/useGame/useGameContext";

/**
 * This is the gameplay page. It is the top-level component for the Game.
 * /game/:roomID/:clientID. It provides the game state and room status
 * and functions to manage the room connection.
 */
export default function GamePage() {
  const { socketStatus } = useGame();

  useEffect(() => {}, []);

  return (
    <>
      <div>{socketStatus === "connected" ? <div>Connected</div> : <div>Connecting...</div>}</div>
    </>
  );
}
