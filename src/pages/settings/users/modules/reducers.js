import { usersListGetActions, userUpdateRoleActions, USERS_LIST_STATUS } from './types';


export default function userReducer(state, action) {
  switch (action.type) {
    case usersListGetActions.USERS_LIST_GET_REQUEST:
      return {
        ...state,
        status: USERS_LIST_STATUS.GETTING,
        error: null
      };

    case usersListGetActions.USERS_LIST_GET_CHANGE_PAGE:
      return {
        ...state,
        status: USERS_LIST_STATUS.INIT,
        page: action.payload.page,
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
      }

    case userUpdateRoleActions.USER_UPDATE_ROLE_REQUEST:
      return {
        ...state,
        status: USERS_LIST_STATUS.GETTING,
      }
    case userUpdateRoleActions.USER_UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        status: USERS_LIST_STATUS.IDLE,
      }
    case userUpdateRoleActions.USERS_LIST_GET_FAILURE:
      return {
        ...state,
        status: USERS_LIST_STATUS.IDLE,
        error: action.payload.message,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
