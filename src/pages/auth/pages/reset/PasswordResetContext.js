import React, { useMemo } from 'react';
import logger from 'use-reducer-logger';
import { postRequest } from 'services/httpRequests';

// constants
const StateContext = React.createContext();
const DispatchContext = React.createContext();

const actions = {
  BEGIN_RESET_PASSWORD_REQUEST: 'BEGIN_RESET_PASSWORD_REQUEST',
  BEGIN_RESET_PASSWORD_SUCCESS: 'BEGIN_RESET_PASSWORD_SUCCESS',
  BEGIN_RESET_PASSWORD_FAILURE: 'BEGIN_RESET_PASSWORD_FAILURE',
  COMPLETE_RESET_PASSWORD_REQUEST: 'COMPLETE_RESET_PASSWORD_REQUEST',
  COMPLETE_RESET_PASSWORD_SUCCESS: 'COMPLETE_RESET_PASSWORD_SUCCESS',
  COMPLETE_RESET_PASSWORD_FAILURE: 'COMPLETE_RESET_PASSWORD_FAILURE',
};

export const IDENTITY_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING',
};

const STATUS = IDENTITY_STATUS;

const initialState = {
  status: STATUS.INIT,
  passwordResetMessage: '',
  resetStatus: false,
  resetComplete: false,
  error: {
    save: null,
    get: null,
  },
};

// reducer
export function passwordResetReducer(state, { type, payload }) {
  switch (type) {
    case actions.BEGIN_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        passwordResetMessage: '',
        resetStatus: false,
        status: STATUS.GETTING,
        error: { ...state.error, get: null },
      };

    case actions.BEGIN_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        passwordResetMessage: payload,
        resetStatus: true,
        error: { ...state.error, get: null },
      };

    case actions.BEGIN_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        passwordResetMessage: payload,
        resetStatus: false,
        error: { ...state.error, get: payload },
      };

    case actions.COMPLETE_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        passwordResetMessage: 'Resetting Password',
        resetStatus: false,
        resetComplete: 'request',
        error: { ...state.error, get: null },
      };

    case actions.COMPLETE_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        status: STATUS.IDLE,
        passwordResetMessage: payload,
        resetComplete: 'success',
        error: { ...state.error, get: payload },
      };

    case actions.COMPELTE_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        status: STATUS.IDLE,
        passwordResetMessage: payload,
        resetComplete: 'failure',
        error: { ...state.error, get: payload },
      };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
}

// context and hooks
export function PasswordResetProvider({ children }) {
  const thisReducer = useMemo(
    () =>
      process.env.NODE_ENV === 'development'
        ? logger(passwordResetReducer)
        : passwordResetReducer,
    []
  );

  const [state, dispatch] = React.useReducer(thisReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function usePasswordResetState() {
  const context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      'usePasswordResetState must be used within a PasswordResetProvider'
    );
  }
  return context;
}

export function usePasswordResetDispatch() {
  const context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error(
      'usePasswordResetDispatch must be used within a PasswordResetProvider'
    );
  }
  return context;
}

// actions
export const beginResetPassword = async (dispatch, email) => {
  dispatch({ type: actions.BEGIN_RESET_PASSWORD_REQUEST });
  try {
    const uri = `/auth/password/reset/start`;
    const result = await postRequest(uri, { email });
    const response = await result.json();
    if (result.status === 200) {
      dispatch({
        type: actions.BEGIN_RESET_PASSWORD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: actions.BEGIN_RESET_PASSWORD_FAILURE });
  }
};

export const completeResetPassword = async (
  dispatch,
  email,
  resetToken,
  newPassword
) => {
  dispatch({ type: actions.COMPLETE_RESET_PASSWORD_REQUEST });
  try {
    const uri = `/auth/password/reset/confirm`;
    const payload = {
      email,
      resetToken,
      newPassword,
    };
    const result = await postRequest(uri, payload);
    const response = await result.json();
    if (result.status === 200) {
      dispatch({
        type: actions.COMPLETE_RESET_PASSWORD_SUCCESS,
        payload: response.message,
      });
    } else {
      dispatch({
        type: actions.COMPELTE_RESET_PASSWORD_FAILURE,
        payload: response.message,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({ type: actions.COMPLETE_RESET_PASSWORD_FAILURE });
  }
};
