import React from "react";

import Room from "../Typing/Room";
import lobbyAPIFetch from "../API/lobbyAPIFetch";

export default function LobbyPage() {
  const [rooms, setRooms] = React.useState<Room[]>([])

  const REFRESH_TIME_MS = 5 * 1000;

  React.useEffect(() => {
    lobbyAPIFetch()
      .then((fetchedRooms) => {
        setRooms(fetchedRooms);
      })

    const interval = setInterval(() => {
      lobbyAPIFetch()
        .then((fetchedRooms) => {
          setRooms(fetchedRooms);
        })
    }, REFRESH_TIME_MS);
    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <h1>Lobby</h1>
      {rooms.map(item => (
        <div itemID={item.game_id}>
          <h2>Name: {item.game_id}</h2>
          <p>Players: {item.players} / {item.max_players}</p>
          <button>Join</button>
        </div>
      ))}
    </div>
  );
}
