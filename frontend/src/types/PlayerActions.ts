//player actions
export const playerActions = ['PLAY', 'READY', 'UNREADY'] as const;
export type PlayerAction = typeof playerActions[number];

export type PlayerActionPayload<T extends PlayerAction> =
  T extends 'PLAY' ? { card: string } :
  T extends 'READY' ? null :
  T extends 'UNREADY' ? null : never