import React from 'react';
import logger from 'use-reducer-logger';
import { getRequest } from '../services/httpRequests';

export const ReadOnlyAbiStateContext = React.createContext();
export const ReadOnlyAbiDispatchContext = React.createContext();

const readOnlyAbiActions = {
  READ_ONLY_ABI_REQUEST: 'READ_ONLY_ABI_REQUEST',
  READ_ONLY_ABI_SUCCESS: 'READ_ONLY_ABI_SUCCESS',
  READ_ONLY_ABI_FAILURE: 'READ_ONLY_ABI_FAILURE',
};

export function readOnlyAbiReducer(state, action) {
  switch (action.type) {
    case readOnlyAbiActions.READ_ONLY_ABI_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Requesting read only abi...',
        data: [],
      };
    case readOnlyAbiActions.READ_ONLY_ABI_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data,
      };
    case readOnlyAbiActions.READ_ONLY_ABI_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: action.payload.message,
        message: null,
        data: [],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export function ReadOnlyAbiProvider({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(readOnlyAbiReducer)
      : readOnlyAbiReducer;
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    error: null,
    message: null,
    data: null,
  });
  return (
    <ReadOnlyAbiStateContext.Provider value={state}>
      <ReadOnlyAbiDispatchContext.Provider value={dispatch}>
        {children}
      </ReadOnlyAbiDispatchContext.Provider>
    </ReadOnlyAbiStateContext.Provider>
  );
}

export function useReadOnlyAbiState() {
  const context = React.useContext(ReadOnlyAbiStateContext);
  if (context === undefined)
    throw new Error(
      'useReadOnlyAbiState must be called in a ReadOnlyAbiProvider'
    );
  return context;
}

export function useReadOnlyAbiDispatch() {
  const context = React.useContext(ReadOnlyAbiDispatchContext);
  if (context === undefined)
    throw new Error(
      'useReadOnlyAbiDispatch must be called within a ReadOnlyAbiProvider'
    );
  return context;
}

export async function getReadOnlyAbi(dispatch, address) {
  dispatch({ type: readOnlyAbiActions.READ_ONLY_ABI_REQUEST });
  try {
    const uri = `/blockchain/contracts/token/abi/read`;
    const result = await getRequest(uri);
    const response = await result.json();
    if (result.status === 200) {
      dispatch({
        type: readOnlyAbiActions.READ_ONLY_ABI_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: readOnlyAbiActions.READ_ONLY_ABI_FAILURE,
        payload: response,
      });
    }
  } catch (err) {
    dispatch({
      type: readOnlyAbiActions.READ_ONLY_ABI_FAILURE,
      payload: { message: 'Failed to get read only abi.' },
    });
  }
}
