import { useParams } from "react-router-dom";
import { GameProvider } from "../hooks/useGame/GameProvider";
import Index from "../gameplay/Index";

export default function GamePage() {
  const { roomID, clientID } = useParams<string>();

  return (
    <>
      <GameProvider roomID={roomID ?? ""} clientID={clientID ?? ""}>
        <Index />
      </GameProvider>
    </>
  );
}
