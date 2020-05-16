import type { UsersListState } from './types';
import { userAddBankActions } from './types';

export default function addBankReducer(
  statusTypes: GenericStatus,
  state: UsersListState,
  action: any
): UsersListState {
  switch (action.type) {
    case userAddBankActions.USER_ADD_BANK_REQUEST:
      return {
        ...state,
        status: statusTypes.GETTING,
      };
    case userAddBankActions.USER_ADD_BANK_SUCCESS:
      return {
        ...state,
        status: statusTypes.IDLE,
      };
    case userAddBankActions.USER_ADD_BANK_FAILURE:
      return {
        ...state,
        status: statusTypes.IDLE,
        error: action.payload.message,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
