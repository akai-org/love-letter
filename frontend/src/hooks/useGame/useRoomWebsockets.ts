import { useCallback, useEffect, useState } from "react";
import { GameState } from '../../types/Game';
import { RoomEvent } from "../../types/RoomEvents";
import { FromRoomMessage, SocketStatus } from "../../types/Socket";
import { PlayerAction, PlayerActionPayload } from "../../types/PlayerActions";
import useRoomEvents from "./useRoomEvents";

/**
 * Custom hook to manage the connection to the room.
 * 
 * @param gameID ID of the game
 * @param clientID ID of the client
 * @param setState React hook to set the state
 * @returns Object containing the server status, the on and send functions
 * 
 * @example
 * const { status, listen, unlisten, send } = useRoom(gameID, clientID, setState);
 */
export default function useRoomWebsockets(gameID: string, clientID: string, setState: React.Dispatch<React.SetStateAction<GameState>>) {

  const [socket,] = useState(() => new WebSocket(import.meta.env.WS_URL + `/${gameID}/${clientID}`));
  const [status, setStatus] = useState<SocketStatus>("disconnected");

  const { listen, trigger, unlisten } = useRoomEvents();

  useEffect(() => {
    socket.onclose = () => {
      setStatus("disconnected");
    };
    socket.onopen = () => {
      send('IDENTITY', { userID: clientID })
      setStatus("connected");
    };
    socket.onmessage = () => (ev: MessageEvent<FromRoomMessage>) => {
      const { events, state } = ev.data;
      if (!events && !state) throw new Error('Message is empty.');

      if (events) events.forEach(event => trigger(event.type as RoomEvent, event.payload));
      if (state) setState(s => ({ ...s, ...state }));
    };

    return () => socket.close();
  }, [gameID, clientID, socket, setState, trigger, send]);


  const send = useCallback(<A extends PlayerAction>(
    type: A,
    payload: PlayerActionPayload<A>
  ) => {
    socket.send(JSON.stringify({ action: { type, payload } }))
  }, [socket]);


  return { status: status, listen: listen, unlisten: unlisten, send: send };
}