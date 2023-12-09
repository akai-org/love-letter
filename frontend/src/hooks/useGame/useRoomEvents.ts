import { useState } from 'react';
import { RoomEvent, RoomEventsListeners, RoomEventListener } from '../../types/RoomEvents';

export default function useRoomEvents() {
  const [events, setEvents] = useState({} as RoomEventsListeners);

  function listen<U extends RoomEvent>(event: U, callback: RoomEventListener<U>) {
    const callbacks = events[event] ?? [];
    const id = callbacks.push(callback);
    setEvents((events) => ({ ...events, [event]: callbacks }));

    return [event, id] as const;
  }

  function unlisten<U extends RoomEvent>([event, id]: readonly [U, number]) {
    const callbacks = events[event] ?? [];
    callbacks.splice(id, 1, null);
    setEvents((events) => ({ ...events, [event]: callbacks }));
  }

  function trigger<U extends RoomEvent>(event: U, ...args: Parameters<RoomEventListener<U>>) {
    const callbacks = events[event] ?? [];
    callbacks.forEach((callback) => callback?.(...args));
  }

  return { listen: listen, unlisten: unlisten, trigger: trigger }
}