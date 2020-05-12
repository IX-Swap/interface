import React from 'react';
import logger from 'use-reducer-logger';
import { postRequest } from '../../../services/httpRequests';

const WalletCreateStateContext = React.createContext();
const WalletCreateDispatchContext = React.createContext();

export const createWalletActions = {
  WALLET_CREATE_REQUEST: 'WALLET_CREATE_REQUEST',
  WALLET_CREATE_SUCCESS: 'WALLET_CREATE_SUCCESS',
  WALLET_CREATE_FAILURE: 'WALLET_CREATE_FAILURE',
};

export function createWalletReducer(state, action) {
  switch (action.type) {
    case createWalletActions.WALLET_CREATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Deploying Contract...',
        data: null,
      };
    case createWalletActions.WALLET_CREATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data,
      };
    case createWalletActions.WALLET_CREATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload.message,
        message: null,
        data: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function WalletCreateProvider({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(createWalletReducer)
      : createWalletReducer;
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    success: false,
    error: null,
    message: null,
    data: null,
  });
  return (
    <WalletCreateStateContext.Provider value={state}>
      <WalletCreateDispatchContext.Provider value={dispatch}>
        {children}
      </WalletCreateDispatchContext.Provider>
    </WalletCreateStateContext.Provider>
  );
}

export function useWalletCreateState() {
  const context = React.useContext(WalletCreateStateContext);
  if (context === undefined)
    throw new Error(
      'useWalletCreateState must be called in a WalletCreateProvider'
    );
  return context;
}

export function useWalletCreateDispatch() {
  const context = React.useContext(WalletCreateDispatchContext);
  if (context === undefined)
    throw new Error(
      'useWalletCreateDispatch must be called within a WalletCreateProvider'
    );
  return context;
}

export async function createWallet(dispatch, network, address) {
  dispatch({ type: createWalletActions.WALLET_CREATE_REQUEST });

  try {
    const uri = '/blockchain/wallet';
    const result = postRequest(uri, { network, address });
    const response = await result.json();

    if (result.status === 200) {
      dispatch({
        type: createWalletActions.WALLET_CREATE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: createWalletActions.WALLET_CREATE_FAILURE,
        payload: response,
      });
    }
  } catch (err) {
    dispatch({
      type: createWalletActions.WALLET_CREATE_FAILURE,
      payload: { message: 'Failed to create wallet.' },
    });
  }
}
