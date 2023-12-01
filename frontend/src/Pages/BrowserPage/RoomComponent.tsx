import { useNavigate } from "react-router-dom";
import { Room } from "../../types/Room";

export default function RoomComponent(props: { room: Room }) {
  const { room } = props;

  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{room.game_id}</h1>
        <p className="text-lg">
          {room.players} / {room.max_players}
        </p>
      </div>
      <div className="flex flex-col">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(`/game/${room.game_id}/join`)}
        >
          Join
        </button>
      </div>
    </div>
  );
}
