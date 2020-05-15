// @flow
import type { User } from 'context/user/types';
import type { Asset } from 'context/assets/types';

export const BANK_LIST_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
};

export const bankListActions = {
  BANK_LIST_GET_CHANGE_ROWS_PER_PAGE: 'BANK_LIST_GET_CHANGE_ROWS_PER_PAGE',
  BANK_LIST_GET_CHANGE_PAGE: 'BANK_LIST_GET_CHANGE_PAGE',
  BANK_LIST_GET_REQUEST: 'BANK_LIST_GET_REQUEST',
  BANK_LIST_GET_SUCCESS: 'BANK_LIST_GET_SUCCESS',
  BANK_LIST_GET_FAILURE: 'BANK_LIST_GET_FAILURE',
};

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
  banks: Array<Bank>,
  page: number,
  limit: number,
  total: ?number,
  error: ?string,
  status: string,
};
