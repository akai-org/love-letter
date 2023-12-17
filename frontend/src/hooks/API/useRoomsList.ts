import { Room } from './../../types/Room';
import { useEffect, useState } from "react";

export default function useRoomsList(filters: { started: boolean }) {
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);

  const REFRESH_TIME_MS = 5000;

  useEffect(() => {
    const fetchRooms = async () => {
      const params = new URLSearchParams({
        started: filters.started ? "true" : "false",
      });

      try {
        const reponse = await fetch(import.meta.env.APP_API_URL + `/games?${params}`)
        const data = await reponse.json();
        setRoomsList(data["games"]);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    const interval = setInterval(() => fetchRooms(), REFRESH_TIME_MS);
    return () => clearInterval(interval);
  }, [filters]);

  return [roomsList, error] as const;
}