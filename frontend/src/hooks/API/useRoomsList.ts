import { useEffect, useState } from "react";
import { Room } from "../../types/Room";


export default function useRoomsList(filters: { started: boolean }): Room[] {
  const [roomsList, setRoomsList] = useState<Room[]>([
    { game_id: "API nie działa", players: 1, max_players: 2 },
    { game_id: "lub Brak pokoi", players: 1, max_players: 2 },
    { game_id: "1", players: 2, max_players: 4 },
    { game_id: "2", players: 2, max_players: 4 },
    { game_id: "3", players: 2, max_players: 4 },
    { game_id: "4", players: 2, max_players: 4 },
    { game_id: "5", players: 2, max_players: 4 },
    { game_id: "6", players: 2, max_players: 4 },
  ]);

  const REFRESH_TIME_MS = 5 * 1000;

  const params = new URLSearchParams({
    started: filters.started ? "true" : "false",
  });

  const fetchRooms = async () => {
    fetch(`http://localhost:8000/api/v1/games?${params}`)
      .then((response) => response.json())
      .then((data) => setRoomsList(data["games"]));
  }

  useEffect(() => {
    fetchRooms();

    const interval = setInterval(() => fetchRooms(), REFRESH_TIME_MS);
    return () => clearInterval(interval);
  }, []);

  return roomsList;
}