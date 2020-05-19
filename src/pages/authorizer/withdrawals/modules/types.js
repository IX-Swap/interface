// @flow
import type { Asset } from 'context/assets/types';
import type { Bank } from 'pages/accounts/bank/modules/types';

export type Withdraw = {
  _id: string,
  status: 'Unauthorized' | 'Approved' | 'Rejected',
  amount: number,
  bank: string,
  withdrawCode: string,
  asset: Asset,
  bankAccount: Bank,
  createdAt: string,
};
