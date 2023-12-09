import { useState } from "react";
import { RoomsList } from "./RoomsList";
import { CreateRoomForm } from "./CreateRoom";

// przykładowy komponent nie przywiązujmy się do niego
export default function BrowserPage() {
  const [creationExpanded, setCreationExpanded] = useState(false);

  return (
    <>
      <h1 className="bg-black p-4 text-center text-4xl text-white">
        Love Letter
        <p className="text-center text-xs">Musimy zmienić ten layout</p>
      </h1>

      <section className="m-auto flex max-w-sm flex-col items-center gap-y-2 overflow-y-clip  p-2 text-center text-black">
        {creationExpanded ? (
          <CreateRoomForm />
        ) : (
          <div className=" m-4 flex w-full items-center justify-center overflow-y-clip font-bold">
            <button
              className="aspect-square rounded-3xl border-2 border-dashed border-black p-1 px-3 transition-all duration-300 hover:bg-black hover:text-white"
              onClick={() => setCreationExpanded(true)}
            >
              +
            </button>
          </div>
        )}

        <RoomsList />
      </section>
    </>
  );
}
