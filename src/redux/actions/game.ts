import { Play } from '../../game-engine/positions';
import Move from '../../game-engine/Move';
import { State } from '../../game-engine/application-states';

export enum GameActionType {
  CHOOSE_OPPONENT = 'GAME.CHOOSE_OPPONENT',
  CHOOSE_PLAY = 'GAME.CHOOSE_PLAY',
  MOVE_RECEIVED = 'GAME.MOVE_RECEIVED',
  MOVE_SENT = 'GAME.MOVE_SENT',
  STATE_CHANGED = 'GAME.STATE_CHANGED',
  PLAY_COMPUTER = 'GAME.PLAY_COMPUTER',
}

export const GameAction = {
  playComputer: (stake: number) => ({
    type: GameActionType.PLAY_COMPUTER as typeof GameActionType.PLAY_COMPUTER,
    stake,
  }),

  chooseOpponent: (opponent: string, stake: number) => ({
    type: GameActionType.CHOOSE_OPPONENT as typeof GameActionType.CHOOSE_OPPONENT,
    opponent,
    stake,
  }),

  choosePlay: (play: Play) => ({
    type: GameActionType.CHOOSE_PLAY as typeof GameActionType.CHOOSE_PLAY,
    play,
  }),

  moveReceived: (move: Move) => ({
    type: GameActionType.MOVE_RECEIVED as typeof GameActionType.MOVE_RECEIVED,
    move,
  }),

  stateChanged: (state: State) => ({
    type: GameActionType.STATE_CHANGED as typeof GameActionType.STATE_CHANGED,
    state,
  }),
};

export type ChooseOpponentAction = ReturnType<typeof GameAction.chooseOpponent>;
export type ChoosePlayAction = ReturnType<typeof GameAction.choosePlay>;
export type MoveReceivedAction = ReturnType<typeof GameAction.moveReceived>;
export type StateChangedAction = ReturnType<typeof GameAction.stateChanged>;
export type PlayComputerAction = ReturnType<typeof GameAction.playComputer>;
export type GameAction =
  | ChooseOpponentAction
  | ChoosePlayAction
  | MoveReceivedAction
  | StateChangedAction
  | PlayComputerAction;
