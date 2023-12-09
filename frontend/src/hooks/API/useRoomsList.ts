import { useEffect, useState } from "react";
import { Room } from "../../types/Room";


export default function useRoomsList(filters: { started: boolean }) {
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);

  const REFRESH_TIME_MS = 5 * 1000;

  const params = new URLSearchParams({
    started: filters.started ? "true" : "false",
  });

  const fetchRooms = async () => {
    fetch(`http://localhost:8000/api/v1/games?${params}`)
      .then((response) => response.json())
      .then((data) => setRoomsList(data["games"]))
      .catch((error) => setError(error.message));
  }

  useEffect(() => {
    fetchRooms();

    const interval = setInterval(() => fetchRooms(), REFRESH_TIME_MS);
    return () => clearInterval(interval);
  }, []);

  return [roomsList, error] as const;
}