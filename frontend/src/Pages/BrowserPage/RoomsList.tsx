import Frame from "../../assets/frame.svg";
import useRoomsList from "../../hooks/API/useRoomsList";
import PersonIcon from "../../assets/person.svg?react";

export function RoomsList(props: { join: (id: string) => void }) {
  const roomsList = useRoomsList({ started: false });

  const ornamentBorder = {
    backgroundImage: `url(${Frame})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    aspectRatio: "1127/439",
  };

  return roomsList.map((room) => (
    <div
      key={room.game_id}
      style={ornamentBorder}
      className=" flex w-full flex-col items-center justify-between gap-1 border-0 bg-white p-4"
    >
      <h2>~ {room.game_id} ~</h2>
      <div className="flex items-center gap-x-2">
        {[...Array(room.max_players)].map((_, i) => (
          <PersonIcon
            style={{ opacity: i >= room.players ? 0.1 : 1 }}
            key={i}
          />
        ))}
      </div>

      <button
        className="border border-dotted border-black px-6 shadow-md"
        onClick={() => props.join(room.game_id)}
      >
        Join
      </button>
    </div>
  ));
}
