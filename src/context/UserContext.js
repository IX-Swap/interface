import React from 'react';
import logger from 'use-reducer-logger';
import { postRequest, getRequest } from 'services/httpRequests';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

export const USER_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING',
};
const initialState = {
  user: {
    userId: '',
    roles: '',
    email: '',
    name: '',
    totpSetup: '',
    totpConfirmed: '',
    verified: '',
  },
  status: USER_STATUS.INIT,
  isAuthenticated: !!localStorage.getItem('id_token'),
  isLoading: false,
  message: '',
  activeTabId: 0,
  error: '',
};

const userActions = {
  SET_ACTIVE_TAB_ID: 'SET_ACTIVE_TAB_ID',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',

  GET_AUTH_ME_REQUEST: 'GET_AUTH_ME_REQUEST',
  GET_AUTH_ME_SUCCESS: 'GET_AUTH_ME_SUCCESS',
  GET_AUTH_ME_FAILURE: 'GET_AUTH_ME_FAILURE',

  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',

  SIGN_UP_REQUEST: 'SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',

  VERIFY_SIGNUP_REQUEST: 'VERIFY_SIGNUP_REQUEST',
  VERIFY_SIGNUP_SUCCESS: 'VERIFY_SIGNUP_SUCCESS',
  VERIFY_SIGNUP_FAILURE: 'VERIFY_SIGNUP_FAILURE',

  SETUP_2FA_REQUEST: 'SETUP_2FA_REQUEST',
  SETUP_2FA_SUCCESS: 'SETUP_2FA_SUCCESS',
  SETUP_2FA_FAILURE: 'SETUP_2FA_FAILURE',

  CONFIRM_2FA_REQUEST: 'CONFIRM_2FA_REQUEST',
  CONFIRM_2FA_SUCCESS: 'CONFIRM_2FA_SUCCESS',
  CONFIRM_2FA_FAILURE: 'CONFIRM_2FA_FAILURE',

  VERIFY_2FA_REQUEST: 'VERIFY_2FA_REQUEST',
  VERIFY_2FA_SUCCESS: 'VERIFY_2FA_SUCCESS',
  VERIFY_2FA_FAILURE: 'VERIFY_2FA_FAILURE',
};

export function userReducer(state, action) {
  switch (action.type) {
    case userActions.LOGIN_REQUEST:
      return {
        ...state,
        user: initialState.user,
        isAuthenticated: false,
        isLoading: true,
        message: '',
        error: null,
      };
    case userActions.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        isVerified: true,
        message: '',
        error: null,
      };
    case userActions.LOGIN_FAILURE:
      return {
        ...state,
        user: initialState.user,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case userActions.GET_AUTH_ME_REQUEST:
      return {
        ...state,
        user: action.payload,
        status: USER_STATUS.GETTING,
        isLoading: true,
        error: null,
      };
    case userActions.GET_AUTH_ME_SUCCESS:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case userActions.GET_AUTH_ME_FAILURE:
      return {
        ...state,
        status: USER_STATUS.IDLE,
        isLoading: false,
        user: initialState.user,
        error: action.payload,
      };
    case userActions.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case userActions.SIGN_UP_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: true,
        error: null,
      };
    case userActions.SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        activeTabId: 0,
      };
    case userActions.SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case userActions.SET_ACTIVE_TAB_ID:
      return {
        ...state,
        activeTabId: action.payload,
        error: null,
      };

    case userActions.VERIFY_SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isVerified: false,
        error: '',
      };

    case userActions.VERIFY_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isVerified: true,
        message: action.payload,
        error: '',
      };
    case userActions.VERIFY_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isVerified: false,
        error: action.payload,
      };

    case userActions.CONFIRM_2FA_REQUEST:
      return {};
    case userActions.CONFIRM_2FA_SUCCESS:
      return {};
    case userActions.CONFIRM_2FA_FAILURE:
      return {};

    case userActions.SETUP_2FA_REQUEST:
      return {};
    case userActions.SETUP_2FA_SUCCESS:
      return {};
    case userActions.SETUP_2FA_FAILURE:
      return {};

    case userActions.VERIFY_2FA_REQUEST:
      return {};
    case userActions.VERIFY_2FA_SUCCESS:
      return {};
    case userActions.VERIFY_2FA_FAILURE:
      return {};

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function UserProvider({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development' ? logger(userReducer) : userReducer;
  const [state, dispatch] = React.useReducer(thisReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

export function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export async function loginUser(dispatch, { email, password, otp }) {
  dispatch({ type: userActions.LOGIN_REQUEST });
  try {
    const uri = '/auth/sign-in';
    const result = await postRequest(uri, { email, password, otp });
    const response = await result.json();
    if (result.status === 200) {
      const { accessToken, email, roles, _id, name } = response.data;
      localStorage.setItem('id_token', accessToken);
      const newUser = {
        _id,
        email,
        roles,
        name,
      };

      dispatch({ type: userActions.LOGIN_SUCCESS, payload: newUser });
    } else {
      dispatch({ type: userActions.LOGIN_FAILURE, payload: response.message });
    }
  } catch (err) {
    dispatch({ type: userActions.LOGIN_FAILURE, payload: 'Login failed.' });
  }
}

export async function signupUser(dispatch, { email, name, password }) {
  dispatch({ type: userActions.SIGN_UP_REQUEST });
  try {
    const uri = '/auth/registrations';
    const result = await postRequest(uri, { email, name, password });
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
    dispatch({ type: userActions.SIGN_UP_FAILURE, payload: 'Signup failed.' });
  }
}

export function setActiveTabId(dispatch, activeTabId) {
  dispatch({ type: userActions.SET_ACTIVE_TAB_ID, payload: activeTabId });
}

export function signOut(dispatch) {
  localStorage.removeItem('id_token');
  dispatch({ type: userActions.SIGN_OUT_SUCCESS });
}

export async function verifySignup(dispatch, token) {
  try {
    dispatch({ type: userActions.VERIFY_SIGNUP_REQUEST });
    const uri = `/auth/registrations/confirm`;
    const result = await postRequest(uri, { verificationToken: token });
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

export async function getUser(dispatch) {
  try {
    dispatch({ type: userActions.GET_AUTH_ME_REQUEST });
    const result = await getRequest('/identity/auth/me');
    if (result.status === 200) {
      const response = await result.json();
      dispatch({
        type: userActions.GET_AUTH_ME_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({ type: userActions.GET_AUTH_ME_FAILURE });
    }
  } catch (err) {
    dispatch({ type: userActions.GET_AUTH_ME_FAILURE });
  }
}
