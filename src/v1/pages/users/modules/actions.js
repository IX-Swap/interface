//
import { putRequest } from 'v1/services/httpRequests'
import actionGenerator from 'v1/context/base/withPagination/actions'

const { getter: getUsersList, ...pageMethods } = actionGenerator(
  'usersList',
  '/auth/users/list',
  {}
)

async function updateUserRole (dispatch, payload) {
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
