// @flow
export const BANK_LIST_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
};

export const bankListActions = {
  BANK_LIST_GET_REQUEST: 'BANK_LIST_GET_REQUEST',
  BANK_LIST_GET_SUCCESS: 'BANK_LIST_GET_SUCCESS',
  BANK_LIST_GET_FAILURE: 'BANK_LIST_GET_FAILURE',
};

export type Bank = {};

export type BanksListState = {
  banks: Array<Bank>,
  page: number,
  limit: ?number,
  total: ?number,
  error: ?string,
  status: string,
};
