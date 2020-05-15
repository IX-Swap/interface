// @flow
import { BANK_LIST_STATUS } from './types';
import type { BanksListState } from './types';

export const initialState: BanksListState = {
  banks: [],
  page: 0,
  limit: 5,
  total: null,
  error: null,
  status: BANK_LIST_STATUS.INIT,
};
