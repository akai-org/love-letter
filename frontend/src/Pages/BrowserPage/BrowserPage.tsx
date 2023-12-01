import useRoomsList from "../../hooks/API/useRoomsList";
import RoomComponent from "./RoomComponent";

// przykładowy komponent nie przywiązujmy się do niego
export default function BrowserPage() {
  const roomsList = useRoomsList({ started: false });

  return (
    <>
      <div
        className="h-screen"
        style={{
          backgroundImage: `url("./crimson_background.png")`,
          backgroundSize: `${window.screen.width / 2}px auto`,
          minHeight: "100svh",
        }}
      >
        <section className="p-2 shadow-lg bg-slate-100">
          <div className="mx-auto w-fit text-center">
            <h1 className="text-4xl">Love Letter</h1>
            <h2>- The AKAI project -</h2>
          </div>
        </section>

        <section className="flex flex-col justify-center mx-56 my-4 gap-y-2 h-56 overflow-scroll">
          {roomsList && roomsList.map((s) => <RoomComponent key={s.game_id} room={s} />)}
        </section>
      </div>
    </>
  );
}
