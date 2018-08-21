import ChannelWallet from '../../wallet/domain/ChannelWallet';
import * as ApplicationStatesB from '../application-states/PlayerB';
import * as GameEngine from '../GameEngine';
import { Play } from '../positions';

it('requires sufficient funds to choose a play', () => {
  const stake = 5;
  const initialBals = [2, 2];
  const wallet = new ChannelWallet();
  const channel = wallet.address;
  const adjudicator = '0x2718';

  const readyToChooseBPlay = new ApplicationStatesB.ReadyToChooseBPlay({
    channel,
    stake,
    balances: initialBals,
    adjudicator,
    turnNum: 5,
    preCommit: '0xf00',
  })

  expect(readyToChooseBPlay).not.toBeNull()

  const gameEngineB = GameEngine.fromState({
    state: readyToChooseBPlay,
    wallet,
  })

  gameEngineB.choosePlay(Play.Rock);

  expect(gameEngineB.state instanceof ApplicationStatesB.InsufficientFundsB).toBe(true)
})