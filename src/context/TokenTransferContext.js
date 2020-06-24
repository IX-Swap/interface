import React from 'react'
import logger from 'use-reducer-logger'
import { getRequest } from '../services/httpRequests'

export const TokenTransferStateContext = React.createContext()
export const TokenTransferDispatchContext = React.createContext()

const tokenTransferActions = {
  TOKEN_TRANSFER_REQUEST: 'TOKEN_TRANSFER_REQUEST',
  TOKEN_TRANSFER_SUCCESS: 'TOKEN_TRANSFER_SUCCESS',
  TOKEN_TRANSFER_FAILURE: 'TOKEN_TRANSFER_FAILURE'
}

export function tokenTransferReducer (state, action) {
  switch (action.type) {
    case tokenTransferActions.TOKEN_TRANSFER_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Requesting token transfer...',
        data: []
      }
    case tokenTransferActions.TOKEN_TRANSFER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case tokenTransferActions.TOKEN_TRANSFER_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: action.payload.message,
        message: null,
        data: []
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function TokenTransferProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(tokenTransferReducer)
      : tokenTransferReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <TokenTransferStateContext.Provider value={state}>
      <TokenTransferDispatchContext.Provider value={dispatch}>
        {children}
      </TokenTransferDispatchContext.Provider>
    </TokenTransferStateContext.Provider>
  )
}

export function useTokenTransferState () {
  const context = React.useContext(TokenTransferStateContext)
  if (context === undefined) {
    throw new Error(
      'useTokenTransferState must be called in a TokenTransferProvider'
    )
  }
  return context
}

export function useTokenTransferDispatch () {
  const context = React.useContext(TokenTransferDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useTokenTransferDispatch must be called within a TokenTransferProvider'
    )
  }
  return context
}

export async function getTokenTransfer (dispatch, symbol) {
  dispatch({ type: tokenTransferActions.TOKEN_TRANSFER_REQUEST })
  try {
    const uri = `/blockchain/contracts/token/${symbol}/transfer`
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      dispatch({
        type: tokenTransferActions.TOKEN_TRANSFER_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: tokenTransferActions.TOKEN_TRANSFER_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: tokenTransferActions.TOKEN_TRANSFER_FAILURE,
      payload: { message: 'Failed to transfer tokens.' }
    })
  }
}
