import { useNavigate } from "react-router-dom";
import useRoomsList from "../../hooks/API/useRoomsList";

import PersonIcon from "../../assets/person.svg?react";
import { useEffect, useRef, useState } from "react";

// przykładowy komponent nie przywiązujmy się do niego
export default function BrowserPage() {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem(
      "name",
    ) as HTMLInputElement;
    if (input) setPlayerName(input.value);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const handleNavigateToRoom = (id: string) => {
    if (playerName) navigate(`/game/${id}/${playerName}`);
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <>
      <h1 className="bg-black p-4 text-center text-4xl text-white">
        Love Letter
      </h1>

      <section className="m-auto flex max-w-sm flex-col items-center gap-2  p-2  text-center text-black">
        {!playerName ? (
          <form className="m-2" onSubmit={handleSubmit}>
            <h2 className="bg-white p-1.5">What is your name, my lord?</h2>
            <input
              className="w-36 border-0 border-b-2 border-t-2 bg-white p-2 text-center outline-none"
              name="name"
              ref={inputRef}
            />
            <input type="submit" hidden />
          </form>
        ) : (
          <div className="bg-white ">
            Hello, {playerName}! Choose your room!
          </div>
        )}

        <RoomList join={handleNavigateToRoom} />
      </section>
    </>
  );
}

import Frame from "../../assets/frame.svg";

function RoomList(props: { join: (id: string) => void }) {
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
          <PersonIcon style={{ opacity: i >= room.players ? 0.1 : 1 }} />
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
