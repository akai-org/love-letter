import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RoomsList } from "./RoomsList";

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

        <RoomsList join={handleNavigateToRoom} />
      </section>
    </>
  );
}
