import { useState } from "react";


export interface CreateRoomOptions {
  name: string;
  max_players: number;
  password: string;
}

export default function useCreateRoom() {

  const [error, setError] = useState<string | null>(null);

  const createRoom = async (options: CreateRoomOptions) => {
    try {
      if (options.name.length === 0) return setError('Room name cannot be empty.');
      if (options.name.length > 32) return setError('Room name is too long.');
      if (options.max_players < 2) return setError('Room must have at least 2 players.');
      if (options.max_players > 6) return setError('Room cannot have more than 6 players.');

      const reponse = await fetch('/api/v1/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })

      const data = await reponse.json();

      switch (reponse.status) {
        case 200:
          setError(null);
          break;
        case 403: // lepiej 409, 403 to nieautoryzowany
          setError('Room already exists');
          break;
        default:
          setError(data.message ?? 'Unknown error');
          break;
      }

      return data;

    } catch (err) {
      setError('Server does not respond');
    }
  }

  return [createRoom, error] as const;
}
