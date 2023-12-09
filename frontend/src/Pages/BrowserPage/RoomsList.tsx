import Frame from "../../assets/frame.svg";
import useRoomsList from "../../hooks/API/useRoomsList";

export function RoomsList() {
  const [roomsList, error] = useRoomsList({ started: false });

  const navigate = useNavigate();
  const handleJoinRoom = (id: string) => navigate(`/game/${id}`);

  const ornamentBorder = {
    backgroundImage: `url(${Frame})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    aspectRatio: "1127/439",
  };

  if (error)
    return <p className="w-full text-center">Something went wrong...</p>;

  return (
    <div className="w-full flex-wrap">
      {roomsList.length === 0 && <p>There is no open rooms.</p>}
      {roomsList.map((room) => (
        <div
          key={room.game_id}
          style={ornamentBorder}
          className=" flex w-1/2 flex-col items-center justify-around border-0 bg-white text-xs"
        >
          <h2 className="m-1">~ {room.game_id} ~</h2>
          <PlayersCounter
            players={room.players ?? 0}
            max_players={room.max_players}
          />
          <button
            className="m-1 rounded-3xl border border-dotted border-black px-4 py-0.5 transition-all duration-300 hover:scale-110 hover:bg-black hover:text-white active:scale-95"
            onClick={() => handleJoinRoom(room.game_id)}
          >
            Join
          </button>
        </div>
      ))}
    </div>
  );
}

import PersonIcon from "../../assets/person.svg?react";
import { useNavigate } from "react-router-dom";

export function PlayersCounter(props: {
  players: number;
  max_players: number;
}) {
  return (
    <div className="">
      {[...Array(props.max_players)].map((_, i) => (
        <PersonIcon
          style={{ opacity: i >= props.players ? 0.1 : 1, height: ".8rem" }}
          key={i}
        />
      ))}
    </div>
  );
}
