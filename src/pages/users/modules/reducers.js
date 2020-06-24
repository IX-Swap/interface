
import type { GenericStatus } from 'context/base/withPagination/types'
import type { UsersListState } from './types'
import { userUpdateRoleActions } from './types'

export default function userReducer (
  statusTypes: GenericStatus,
  state: UsersListState,
  action: any
): UsersListState {
  switch (action.type) {
    case userUpdateRoleActions.USER_UPDATE_ROLE_REQUEST:
      return {
        ...state,
        status: statusTypes.GETTING
      }
    case userUpdateRoleActions.USER_UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        status: statusTypes.IDLE
      }
    case userUpdateRoleActions.USER_UPDATE_ROLE_FAILURE:
      return {
        ...state,
        status: statusTypes.IDLE,
        error: action.payload.message
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
