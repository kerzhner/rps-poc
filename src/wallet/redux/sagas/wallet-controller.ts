import { WalletEngine, setupWalletEngine } from '../../wallet-engine/WalletEngine';
import {
  Wallet,
  WalletFundingActionType,
  WalletFundingAction,
  WalletFundingRequestAction,
} from '../..';
import { take, put, actionChannel } from 'redux-saga/effects';
import {
  BlockchainAction,
  BlockchainActionType,
  BlockchainReceiveEventAction,
} from '../actions/blockchain';
import { State } from '../../wallet-engine/wallet-states';
import { WalletStateActions } from '../actions/wallet-state';

export default function* walletControllerSaga() {
  const { wallet, playerIndex } = yield take(
    WalletFundingActionType.WALLETFUNDING_REQUEST,
  );

  // TODO: We'll need some logic to figure out the current state of funding,
  // in case of a page reload, by talking to the blockchain

  const walletEngine = setupWalletEngine(wallet, playerIndex);
  put(deployAdjudicator);
  const { adjudicatorAddress } = take(adjudicatorDeployed);
  const walletState = walletEngine.transitionTo(WalletStates.AdjudicatorDeployed);
  put(
    walletStateChanged,
    walletState
  );

  put(fundAdjudicator);
  const { fundedAmount } = take(adjudicatorFundedByMe);
  walletState = walletEngine.transitionTo(WalletStates.AdjudicatorFundedByMe);
  put(
    walletStateChanged,
    walletState
  );


  put(tellOtherPlayerAdjFunded);
  take(adjudicatorFundedByYou);
  walletState = walletEngine.transitionTo(WalletStates.AdjudicatorFundedByYou);
  put(
    walletStateChanged,
    walletState
  );

  put(sendPostFundSetup);
  take(postFundSetupReceived)
  walletState = walletEngine.transitionTo(WalletStates.PostFundSetupReceived);
  put(
    walletStateChanged,
    walletState
  );
  put(walletFunded);
}
