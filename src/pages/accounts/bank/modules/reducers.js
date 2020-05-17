// @flow
import type { GenericStatus } from 'context/base/withPagination/types';
import type { BanksListState } from './types';
import { userAddBankActions, bankSaveStatus } from './types';

export default function addBankReducer(
  statusTypes: GenericStatus,
  state: BanksListState,
  action: any
): BanksListState {
  switch (action.type) {
    case userAddBankActions.USER_ADD_BANK_REQUEST:
      return {
        ...state,
        status: bankSaveStatus.BANK_SAVING,
        statusCode: undefined,
        error: '',
      };
    case userAddBankActions.USER_ADD_BANK_SUCCESS:
      return {
        ...state,
        status: statusTypes.IDLE,
        statusCode: 200,
        error: '',
      };
    case userAddBankActions.USER_ADD_BANK_FAILURE:
      return {
        ...state,
        status: statusTypes.IDLE,
        error: action.payload.message,
        statusCode: action.payload.statusCode,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
