//player actions
export enum PlayerAction {
  PLAY = 'PLAY',
  READY = 'READY',
  UNREADY = 'UNREADY',
  IDENTIFY = 'IDENTIFY',
}

export type PlayerActionPayload<T extends PlayerAction> =
  T extends PlayerAction.PLAY ? { card: string } :
  T extends PlayerAction.READY ? null :
  T extends PlayerAction.UNREADY ? null :
  T extends PlayerAction.IDENTIFY ? { userID: string } : never;