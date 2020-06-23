// @flow
import { putRequest } from 'services/httpRequests'
import actionGenerator from 'context/base/withPagination/actions'
import { userUpdateRoleActions } from './types'

const { getter: getUsersList, ...pageMethods } = actionGenerator(
  'usersList',
  '/auth/users/list',
  {}
)

async function updateUserRole (
  dispatch: Function,
  payload: { roles: string, userId: string }
) {
  dispatch({ type: userUpdateRoleActions.USER_UPDATE_ROLE_REQUEST })

  try {
    const uri = `/auth/users/${payload.userId}/roles`
    const result = await putRequest(uri, { roles: payload.roles })
    const response = await result.json()

    if (result.status === 200) {
      dispatch({
        type: userUpdateRoleActions.USER_UPDATE_ROLE_SUCCESS,
        payload: {}
      })
    } else {
      dispatch({
        type: userUpdateRoleActions.USER_UPDATE_ROLE_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: userUpdateRoleActions.USER_UPDATE_ROLE_FAILURE,
      payload: { message: "Failed to update this user's role." }
    })
  }
}

export default {
  getUsersList,
  updateUserRole,
  ...pageMethods
}
