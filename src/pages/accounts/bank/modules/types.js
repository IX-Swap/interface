// @flow
import type { User } from 'context/user/types';
import type { Asset } from 'context/assets/types';

export const userAddBankActions = {
  USER_ADD_BANK_REQUEST: 'USER_ADD_BANK_REQUEST',
  USER_ADD_BANK_SUCCESS: 'USER_ADD_BANK_SUCCESS',
  USER_ADD_BANK_FAILURE: 'USER_ADD_BANK_FAILURE',
};
export type BankRequest = {
  _id?: string,
  asset: string,
  bankName: string,
  bankAccountNumber: string,
  accountHolderName: string,
  swiftCode: string,
};

export const baseBankRequest: BankRequest = Object.freeze({
  asset: '',
  bankName: '',
  bankAccountNumber: '',
  accountHolderName: '',
  swiftCode: '',
});

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
