import { useState } from "react";
import useRoomsList, {
  RoomListFilters,
  initialRoomListFilters,
} from "../../hooks/API/useRoomsList";
import { Filters } from "./Filters";
import { RoomItem } from "./RoomItem";

export default function BrowserPage() {
  const [filters, setFilters] = useState<RoomListFilters>(
    initialRoomListFilters,
  );
  const [list, error] = useRoomsList(filters);

  return (
    <div className="grid h-screen max-h-screen w-full grid-cols-3 bg-gradient-to-t from-black to-llred text-white">
      <div className="col-span-1 px-2">
        <h1 className="p-1">Filters</h1>
        <div className="scrollbar max-h-[calc(100vh-40px)] overflow-y-auto overflow-x-hidden pr-1 text-xs">
          <Filters filters={filters} setFilters={setFilters} />
        </div>
      </div>

      <div className="col-span-2 px-2">
        <div className="flex justify-between p-1">
          <span>Rooms</span>
          <span className="px-2">Players</span>
        </div>

        <div className="scrollbar grid max-h-[calc(100vh-40px)] gap-1  overflow-y-auto  overflow-x-hidden pr-1 text-xs">
          {error ? (
            <div className="p-2 text-center">
              Something went wront with connecting to the server...
            </div>
          ) : (
            list &&
            list.map((room) => <RoomItem key={room.game_id} room={room} />)
          )}
        </div>
      </div>
    </div>
  );
}
