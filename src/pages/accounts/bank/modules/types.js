// @flow
import type { User } from 'context/user/types';
import type { Asset } from 'context/assets/types';

export type Bank = {
  _id: string,
  user: User,
  asset: Asset,
  status: string,
  deleted: boolean,
  bankName: string,
  bankAccountNumber: string,
  accountHolderName: string,
  swiftCode: string,
  authorized: boolean,
};

export type BanksListState = {
  items: Array<Bank>,
  page: number,
  limit: number,
  total: ?number,
  error: ?string,
  status: string,
};
