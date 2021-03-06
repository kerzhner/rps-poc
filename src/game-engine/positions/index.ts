import { toHex32, padBytes32 } from 'fmg-core';
import { soliditySha3 } from 'web3-utils';

import Accept from './Accept';
import Conclude from './Conclude';
import PostFundSetupA from './PostFundSetupA';
import PreFundSetupA from './PreFundSetupA';
import PostFundSetupB from './PostFundSetupB';
import PreFundSetupB from './PreFundSetupB';
import Propose from './Propose';
import Resting from './Resting';
import Reveal from './Reveal';

export {
  PreFundSetupA,
  PreFundSetupB,
  PostFundSetupA,
  PostFundSetupB,
  Propose,
  Accept,
  Reveal,
  Resting,
  Conclude,
};

export type Position =
  | PreFundSetupA
  | PreFundSetupB
  | PostFundSetupA
  | PostFundSetupB
  | Propose
  | Accept
  | Reveal
  | Resting
  | Conclude;

export enum GamePositionType {
  Resting,
  Propose,
  Accept,
  Reveal,
}

export enum Play {
  Rock,
  Paper,
  Scissors,
}

export enum Result {
  Tie,
  YouWin,
  YouLose,
}

export function packRestingAttributes(stake: number) {
  return toHex32(GamePositionType.Resting).substr(2) + toHex32(stake).substr(2);
}

export function packProposeAttributes(stake: number, preCommit: string) {
  return (
    toHex32(GamePositionType.Propose).substr(2) +
    toHex32(stake).substr(2) +
    padBytes32(preCommit).substr(2)
  );
}

export function packAcceptAttributes(stake: number, preCommit: string, bPlay: Play) {
  return (
    toHex32(GamePositionType.Accept).substr(2) +
    toHex32(stake).substr(2) +
    padBytes32(preCommit).substr(2) +
    toHex32(bPlay).substr(2)
  );
}

export function packRevealAttributes(stake: number, bPlay: Play, aPlay: Play, salt: string) {
  return (
    toHex32(GamePositionType.Reveal).substr(2) +
    toHex32(stake).substr(2) +
    padBytes32('0x0').substr(2) + // don't need the preCommit
    toHex32(bPlay).substr(2) +
    toHex32(aPlay).substr(2) +
    padBytes32(salt).substr(2)
  );
}

export function hashCommitment(play: Play, salt: string) {
  return soliditySha3(
    { type: 'uint256', value: play },
    { type: 'bytes32', value: padBytes32(salt) },
  );
}

export function calculateResult(aPlay: Play, bPlay: Play) {
  const x = (aPlay - bPlay + 2) % 3;
  switch (x) {
    case 0:
      return Result.YouWin;
    case 1:
      return Result.YouLose;
    default:
      return Result.Tie;
  }
}
