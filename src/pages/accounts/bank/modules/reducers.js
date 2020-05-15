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
        banks: payload.banks,
        total: payload.total,
      };
    case bankListActions.BANK_LIST_GET_FAILURE:
      return {
        ...state,
        status: BANK_LIST_STATUS.IDLE,
        error: payload.message,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}
