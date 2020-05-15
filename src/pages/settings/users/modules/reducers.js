// @flow
import type { UsersListState } from './types';

import {
  usersListGetActions,
  userUpdateRoleActions,
  USERS_LIST_STATUS,
} from './types';

export default function userReducer(
  state: UsersListState,
  action: any
): UsersListState {
  switch (action.type) {
    case usersListGetActions.USERS_LIST_GET_REQUEST:
      return {
        ...state,
        status: USERS_LIST_STATUS.GETTING,
        error: null,
      };
    case usersListGetActions.USERS_LIST_GET_CHANGE_PAGE:
      return {
        ...state,
        status: USERS_LIST_STATUS.INIT,
        page: action.payload.page || 0,
      };
    case usersListGetActions.USERS_LIST_GET_SUCCESS:
      return {
        ...state,
        status: USERS_LIST_STATUS.IDLE,
        error: null,
        users: action.payload.users,
        total: action.payload.total,
      };
    case usersListGetActions.USERS_LIST_GET_FAILURE:
      return {
        ...state,
        status: USERS_LIST_STATUS.IDLE,
        error: action.payload.message,
      };
    case usersListGetActions.USERS_LIST_GET_CHANGE_ROWS_PER_PAGE:
      return {
        ...state,
        limit: action.payload.rows,
      };

    case userUpdateRoleActions.USER_UPDATE_ROLE_REQUEST:
      return {
        ...state,
        status: USERS_LIST_STATUS.GETTING,
      };
    case userUpdateRoleActions.USER_UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        status: USERS_LIST_STATUS.IDLE,
      };
    case userUpdateRoleActions.USER_UPDATE_ROLE_FAILURE:
      return {
        ...state,
        status: USERS_LIST_STATUS.IDLE,
        error: action.payload.message,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
