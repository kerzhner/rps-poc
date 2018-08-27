import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { generateContractsInitialState, Drizzle } from 'drizzle';

import reducer from './reducers';
import rootSaga from './sagas';
import RockPaperScissorsGame from '../contracts/RockPaperScissorsGame.json';


const sagaMiddleware = createSagaMiddleware();

const enhancers = compose(
  applyMiddleware(sagaMiddleware),
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : f => f,
);

const drizzleOptions = {
  contracts: [RockPaperScissorsGame],
};
const initialState = {
  contracts: generateContractsInitialState(drizzleOptions),
};

const store = createStore(reducer, initialState, enhancers); 
// @ts-ignore
const drizzle = new Drizzle(drizzleOptions, store);
sagaMiddleware.run(rootSaga);

export default store;

export const getApplicationState = (storeObj: any) => storeObj.game;
export const getWalletState = (storeObj: any) => storeObj.wallet;
export const getUser = (storeObj: any) => storeObj.login.user;
export const getContracts = (storeObj: any) => storeObj.contracts;
