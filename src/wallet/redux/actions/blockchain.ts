import { Wallet } from '../..';

export type BlockchainSendTransactionAction = ReturnType<typeof BlockchainAction.sendTransaction>;
export type BlockchainReceiveEventAction = ReturnType<typeof BlockchainAction.receiveEvent>;
export type BlockchainDeployAdjudicatorAction = ReturnType<typeof BlockchainAction.deployAdjudicator>;
export type BlockchainAction = BlockchainSendTransactionAction | BlockchainReceiveEventAction;

export enum BlockchainActionType {
  BLOCKCHAIN_SENDTRANSACTION = 'BLOCKCHAIN.SENDTRANSACTION',
  BLOCKCHAIN_RECEIVEEVENT = 'BLOCKCHAIN.RECEIVEEVENT',
  BLOCKCHAIN_DEPLOYADJUDICATOR = 'BLOCKCHAIN.DEPLOYADJUDICATOR',
}

export const BlockchainAction = {
  sendTransaction: (transaction: string, wallet: Wallet) => ({
    type: BlockchainActionType.BLOCKCHAIN_SENDTRANSACTION,
    transaction,
    wallet,
  }),
  receiveEvent: (event: any) => ({
    type: BlockchainActionType.BLOCKCHAIN_RECEIVEEVENT,
    event,
  }),
  deployAdjudicator: (transaction: string, depositAmount: number) => ({
    type: BlockchainActionType.BLOCKCHAIN_DEPLOYADJUDICATOR,
    transaction,
    depositAmount,
  }),
};
