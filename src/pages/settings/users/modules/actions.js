import { usersListGetActions, userUpdateRoleActions } from './types';
import { postRequest, putRequest } from '../../../../services/httpRequests';

export async function getUsersList(dispatch, payload) {
  const { ref, ...data } = payload || { ref: {} };
  dispatch({ type: usersListGetActions.USERS_LIST_GET_REQUEST });

  try {
    const uri = '/auth/users/list';
    const result = await postRequest(uri, { skip: 0, limit: 50, ...data });
    const response = await result.json();

    if (!ref.current) return null;

    if (result.status === 200) {
      const { limit, count, skip, documents } = response.data[0];
      dispatch({
        type: usersListGetActions.USERS_LIST_GET_SUCCESS,
        payload: {
          page: Math.floor(skip / limit) + 1,
          total: Math.ceil(count / limit),
          users: documents,
        },
      });
    } else {
      dispatch({
        type: usersListGetActions.USERS_LIST_GET_FAILURE,
        payload: response,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: usersListGetActions.USERS_LIST_GET_FAILURE,
      payload: { message: 'Failed to get user list.' },
    });
  }
}

export async function updateUserRole(dispatch, payload) {
  dispatch({ type: userUpdateRoleActions.USER_UPDATE_ROLE_REQUEST });

  try {
    const uri = `/auth/users/${payload.userId}/roles`;
    const result = await putRequest(uri, { roles: payload.roles });
    const response = await result.json();

    if (result.status === 200) {
      dispatch({
        type: userUpdateRoleActions.USER_UPDATE_ROLE_SUCCESS,
        payload: {},
      });
    } else {
      dispatch({
        type: userUpdateRoleActions.USER_UPDATE_ROLE_FAILURE,
        payload: response,
      });
    }
  } catch (err) {
    dispatch({
      type: userUpdateRoleActions.USER_UPDATE_ROLE_FAILURE,
      payload: { message: "Failed to update this user's role." },
    });
  }
}

export async function setPage(dispatch, payload) {
  dispatch({ type: usersListGetActions.USERS_LIST_GET_CHANGE_PAGE, payload });
}
