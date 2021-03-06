import BaseState from '../Base';
import { Player } from '..';
import {
  Play,
  Position,
  PreFundSetupA,
  PostFundSetupA,
  PreFundSetupB,
  PostFundSetupB,
  Propose,
  Reveal,
  Resting,
  Conclude,
  calculateResult,
} from '../../positions';

export enum PlayerAStateType {
  WAIT_FOR_PRE_FUND_SETUP = 'PLAYER_A.WAIT_FOR_PRE_FUND_SETUP',
  WAIT_FOR_FUNDING = 'PLAYER_A.WAIT_FOR_FUNDING',
  WAIT_FOR_POST_FUND_SETUP = 'PLAYER_A.WAIT_FOR_POST_FUND_SETUP',
  CHOOSE_PLAY = 'PLAYER_A.CHOOSE_PLAY',
  WAIT_FOR_ACCEPT = 'PLAYER_A.WAIT_FOR_ACCEPT',
  WAIT_FOR_RESTING = 'PLAYER_A.WAIT_FOR_RESTING',
  WAIT_FOR_CONCLUDE = 'PLAYER_A.WAIT_FOR_CONCLUDE',
  INSUFFICIENT_FUNDS = 'PLAYER_A.INSUFFICIENT_FUNDS',
}

class BasePlayerA<T extends Position> extends BaseState<T> {
  readonly player = Player.PlayerA;
}

export class WaitForPreFundSetup extends BasePlayerA<PreFundSetupA> {
  readonly type = PlayerAStateType.WAIT_FOR_PRE_FUND_SETUP;
  readonly isReadyToSend = false;

  get stake() {
    return this.position.stake;
  }
}

export class WaitForFunding extends BasePlayerA<PreFundSetupB> {
  readonly type = PlayerAStateType.WAIT_FOR_FUNDING;
  readonly isReadyForFunding = false;
  readonly isReadyToSend = false;
  get stake() {
    return this.position.stake;
  }
}

export class WaitForPostFundSetup extends BasePlayerA<PostFundSetupA> {
  readonly type = PlayerAStateType.WAIT_FOR_POST_FUND_SETUP;
  readonly isReadyToSend = false;
  get stake() {
    return this.position.stake;
  }
}

export class ChoosePlay extends BasePlayerA<PostFundSetupB | Resting> {
  readonly type = PlayerAStateType.CHOOSE_PLAY;
  readonly isReadyToSend = false;
  get stake() {
    return this.position.stake;
  }
}

export class WaitForAccept extends BasePlayerA<Propose> {
  readonly type = PlayerAStateType.WAIT_FOR_ACCEPT;
  aPlay: Play;
  salt: string;
  readonly isReadyToSend = false;

  constructor({ position, aPlay, salt }) {
    super({ position });
    this.aPlay = aPlay;
    this.salt = salt;
  }

  get stake() {
    return this.position.stake;
  }
}

export class WaitForResting extends BasePlayerA<Reveal> {
  readonly type = PlayerAStateType.WAIT_FOR_RESTING;
  readonly isReadyToSend = false;

  get stake() {
    return this.position.stake;
  }
  get aPlay() {
    return this.position.aPlay;
  }
  get bPlay() {
    return this.position.bPlay;
  }
  get salt() {
    return this.position.salt;
  }
  get result() {
    return calculateResult(this.aPlay, this.bPlay);
  }
}

// todo: what should Position be here?
export class InsufficientFunds extends BasePlayerA<Position> {
  readonly type = PlayerAStateType.INSUFFICIENT_FUNDS;
  readonly isReadyToSend = false;
}

export class WaitForConclude extends BasePlayerA<Conclude> {
  readonly type = PlayerAStateType.WAIT_FOR_CONCLUDE;
  readonly isReadyToSend = false;
}

export type PlayerAState =
  | WaitForPreFundSetup
  | WaitForFunding
  | WaitForPostFundSetup
  | ChoosePlay
  | WaitForAccept
  | WaitForResting
  | InsufficientFunds
  | WaitForConclude;
