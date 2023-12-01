export default function LobbyPage() {
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
          <div>
            <button className="bg-slate-100 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded-full">
              Create room
            </button>
          </div>
          <div>
            <button className="bg-slate-100 hover:bg-slate-200 text-black font-bold py-2 px-4 rounded-full">
              Join room
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
