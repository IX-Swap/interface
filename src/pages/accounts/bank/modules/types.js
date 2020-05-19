// @flow
import type { User } from 'context/user/types';
import type { Asset } from 'context/assets/types';
import type { BaseStateWithPagination } from 'context/base/withPagination/types';

export const userAddBankActions = {
  USER_ADD_BANK_REQUEST: 'USER_ADD_BANK_REQUEST',
  USER_ADD_BANK_SUCCESS: 'USER_ADD_BANK_SUCCESS',
  USER_ADD_BANK_FAILURE: 'USER_ADD_BANK_FAILURE',
};

export const getSpecificBankActions = {
  GET_SPECIFIC_BANK_REQUEST: 'GET_SPECIFIC_BANK_REQUEST',
  GET_SPECIFIC_BANK_SUCCESS: 'GET_SPECIFIC_BANK_SUCCESS',
  GET_SPECIFIC_BANK_FAILURE: 'GET_SPECIFIC_BANK_FAILURE',
};

export const bankSaveStatus = {
  BANK_SAVING: 'BANK_SAVING',
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
  createdAt: string,
};

export type BanksListState = {
  ...$Exact<BaseStateWithPagination<Bank>>,
  items: Array<Bank>,
};
