import { useNavigate } from "react-router-dom";
import { Room } from "../../types/Room";
import { useState } from "react";
import clsx from "clsx";

const characterIcons = [
  "icons/icon_char1.svg",
  "icons/icon_char2.svg",
  "icons/icon_char3.svg",
  "icons/icon_char4.svg",
  "icons/icon_char5.svg",
  "icons/icon_char6.svg",
  "icons/icon_char7.svg",
  "icons/icon_char8.svg",
];

export function RoomItem({ room }: { room: Room }) {
  const navigate = useNavigate();
  const handleJoinRoom = (id: string) => navigate(`/game/${id}`);

  const [hover, setHover] = useState(false);
  const handleHover = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  return (
    <div
      {...handleHover}
      className={clsx(
        "flex h-12 select-none duration-200 hover:bg-llred ",
        hover && "active:scale-95",
      )}
      onClick={() => handleJoinRoom(room.game_id)}
    >
      <div className="flex w-full cursor-pointer duration-200 hover:text-black">
        <div className="flex aspect-square h-full justify-center bg-llred">
          {/* Icon */}
          {hover ? (
            <img
              className="h-full object-cover p-1"
              src="icons/play_arrow.svg"
              alt="Play button"
            />
          ) : (
            <img
              className="h-full object-cover p-2 invert"
              src={characterIcons[room.players % 8]}
              alt="Character icon"
            />
          )}
        </div>

        {/* Room name */}
        <span className="w-full p-1">{room.game_id}</span>
        {/* Players */}
        <div className="flex w-24 items-center justify-center">
          {room.players} / {room.max_players}
        </div>
      </div>
    </div>
  );
}
