// @flow
import { bankListActions, BANK_LIST_STATUS } from './types';

import type { BanksListState } from './types';

export default function banksListReducer(
  state: BanksListState,
  { type, payload }: { type: string, ...any }
): BanksListState {
  switch (type) {
    case bankListActions.BANK_LIST_GET_REQUEST:
      return {
        ...state,
        status: BANK_LIST_STATUS.GETTING,
        error: '',
      };
    case bankListActions.BANK_LIST_GET_SUCCESS:
      return {
        ...state,
        status: BANK_LIST_STATUS.IDLE,
        error: null,
        banks: payload.banks.map((bank) => ({
          ...bank,
          get authorized() {
            return this.status === 'Authorized';
          },
        })),
        total: payload.total,
      };
    case bankListActions.BANK_LIST_GET_FAILURE:
      return {
        ...state,
        status: BANK_LIST_STATUS.IDLE,
        error: payload.message,
      };
    case bankListActions.BANK_LIST_GET_CHANGE_PAGE:
      return {
        ...state,
        status: BANK_LIST_STATUS.INIT,
        page: payload.page || 0,
      };
    case bankListActions.BANK_LIST_GET_CHANGE_ROWS_PER_PAGE:
      return {
        ...state,
        limit: payload.rows,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}
