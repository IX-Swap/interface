// @flow
import type { Asset } from 'context/assets/types';

export type DSWithdrawal = {
  _id: string,
  status: string,
  user: string,
  asset: Asset,
  recipientWallet: string,
  amount: number,
  memo: string,
  hold: string,
  createdAt: string,
  updatedAt: string,
  transaction: string,
  level: string,
};

export type TableColumns = {
  key: $Keys<DSWithdrawal>,
  label: string,
  align?: ?string,
  render?: ?(string | Asset | number) => string,
};
