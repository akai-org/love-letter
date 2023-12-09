import { useState } from 'react';
import { RoomEvent, RoomEventsListeners, RoomEventListener } from '../../types/RoomEvents';

const initialEventsListeners = Object.keys(RoomEvent).reduce((acc, event) => {
  acc[event as RoomEvent] = [];
  return acc;
}, {} as RoomEventsListeners);

export default function useRoomEvents() {
  const [events, setEvents] = useState(initialEventsListeners);

  function listen<U extends RoomEvent>(event: U, callback: RoomEventListener<U>) {
    const callbacks = events[event] ?? [];
    const id = callbacks.push(callback);
    setEvents((events) => ({ ...events, [event]: callbacks }));

    return [event, id] as const;
  }

  function unlisten<U extends RoomEvent>([event, id]: readonly [U, number]) {
    const callbacks = events[event] ?? [];
    callbacks.splice(id, 1, () => { });
    setEvents((events) => ({ ...events, [event]: callbacks }));
  }

  function trigger<U extends RoomEvent>(event: U, args: Parameters<RoomEventListener<U>>) {
    if (!(event in RoomEvent)) throw new Error(`Event ${event} does not exist.`);

    const callbacks = events[event] ?? [];
    callbacks.forEach((callback) => { if (callback) callback(args[0] as never, args[1] as string) });
  }

  return { listen: listen, unlisten: unlisten, trigger: trigger }
}