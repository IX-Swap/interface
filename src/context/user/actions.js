import { postRequest, getRequest } from 'services/httpRequests';
import localStore from 'services/storageHelper';
import { _subscribeToSocket, subscribeToSocket } from 'services/socket';
import { userActions } from './types';

export async function loginUser(
  dispatch: Function,
  payload: { email: string, password: string, otp: string }
) {
  dispatch({ type: userActions.LOGIN_REQUEST });
  try {
    const uri = '/auth/sign-in';
    const result = await postRequest(uri, { ...payload });
    const response = await result.json();
    if (result.status === 200) {
      const {
        email,
        roles,
        _id,
        name,
        accessToken,
        totpConfirmed,
      } = response.data;
      localStore.set({ _id, accessToken });
      localStore.store('visitedUrl', []);
      const newUser = {
        _id,
        email,
        roles,
        name,
        totpConfirmed,
      };

      dispatch({ type: userActions.LOGIN_SUCCESS, payload: newUser });
    } else {
      dispatch({ type: userActions.LOGIN_FAILURE, payload: response.message });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch({ type: userActions.LOGIN_FAILURE, payload: 'Login failed.' });
  }
}

export async function signupUser(
  dispatch: Function,
  payload: { email: string, name: string, password: string }
) {
  dispatch({ type: userActions.SIGN_UP_REQUEST });
  try {
    const uri = '/auth/registrations';
    const result = await postRequest(uri, { ...payload });
    const response = await result.json();

    if (result.status === 200) {
      dispatch({ type: userActions.SIGN_UP_SUCCESS });
      dispatch({ type: userActions.SET_ACTIVE_TAB_ID, payload: 2 });
    } else {
      dispatch({
        type: userActions.SIGN_UP_FAILURE,
        payload: response.message,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response);
    dispatch({ type: userActions.SIGN_UP_FAILURE, payload: 'Signup failed.' });
  }
}

export function setActiveTabId(dispatch: Function, activeTabId: number) {
  dispatch({ type: userActions.SET_ACTIVE_TAB_ID, payload: activeTabId });
}

export function signOut(dispatch: Function) {
  localStore.remove();
  dispatch({ type: userActions.SIGN_OUT_SUCCESS });

  const socket = subscribeToSocket();

  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
  }

  // TODO: Fix to not hacky solution
  window.location = '#/auth/sign-in';
}

export async function verifySignup(
  dispatch: Function,
  verificationToken: string
) {
  try {
    dispatch({ type: userActions.VERIFY_SIGNUP_REQUEST });
    const uri = `/auth/registrations/confirm`;
    const result = await postRequest(uri, { verificationToken });
    if (result.status === 200) {
      dispatch({
        type: userActions.VERIFY_SIGNUP_SUCCESS,
        payload: 'Successfully verfied. Please login in, again.',
      });
    } else {
      dispatch({
        type: userActions.VERIFY_SIGNUP_FAILURE,
        payload: 'Failed to verify Sign up.',
      });
    }
  } catch (err) {
    dispatch({ type: userActions.VERIFY_SIGNUP_FAILURE, payload: err });
  }
}

export async function getUser(dispatch: Function) {
  const userId = localStore.getUserId();
  try {
    dispatch({ type: userActions.GET_AUTH_ME_REQUEST });
    const result = await getRequest(`/auth/profiles/${userId}`);
    if (result.status === 200) {
      const response = await result.json();
      await _subscribeToSocket();
      dispatch({
        type: userActions.GET_AUTH_ME_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({ type: userActions.GET_AUTH_ME_FAILURE });
      signOut(dispatch);
    }
  } catch (err) {
    signOut(dispatch);
    dispatch({ type: userActions.GET_AUTH_ME_FAILURE });
  }
}
