import { useParams } from "react-router-dom";
import { GameProvider } from "../../hooks/useGame/GameProvider";
import { useGame } from "../../hooks/useGame/useGameContext";

export default function RoomPage() {
  const { roomID, clientID } = useParams<string>();

  return (
    <GameProvider roomID={roomID ?? ""} clientID={clientID ?? ""}>
      <Index />
    </GameProvider>
  );
}

function Index() {
  const { socketStatus } = useGame();

  return (
    <>
      <div>{socketStatus === "connected" ? <div>Connected</div> : <div>Connecting...</div>}</div>
    </>
  );
}
