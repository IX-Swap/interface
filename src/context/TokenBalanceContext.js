import React from 'react'
import logger from 'use-reducer-logger'
import { getRequest } from './httpRequests'

export const TokenBalanceStateContext = React.createContext()
export const TokenBalanceDispatchContext = React.createContext()

const tokenBalanceActions = {
  TOKEN_BALANCE_REQUEST: 'TOKEN_BALANCE_REQUEST',
  TOKEN_BALANCE_SUCCESS: 'TOKEN_BALANCE_SUCCESS',
  TOKEN_BALANCE_FAILURE: 'TOKEN_BALANCE_FAILURE'
}

export function tokenBalanceReducer (state, action) {
  switch (action.type) {
    case tokenBalanceActions.TOKEN_BALANCE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Requesting token balance...',
        data: []
      }
    case tokenBalanceActions.TOKEN_BALANCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case tokenBalanceActions.TOKEN_BALANCE_FAILURE:
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

export function TokenBalanceProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(tokenBalanceReducer)
      : tokenBalanceReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <TokenBalanceStateContext.Provider value={state}>
      <TokenBalanceDispatchContext.Provider value={dispatch}>
        {children}
      </TokenBalanceDispatchContext.Provider>
    </TokenBalanceStateContext.Provider>
  )
}

export function useTokenBalanceState () {
  const context = React.useContext(TokenBalanceStateContext)
  if (context === undefined)
    throw new Error(
      'useTokenBalanceState must be called in a TokenBalanceProvider'
    )
  return context
}

export function useTokenBalanceDispatch () {
  const context = React.useContext(TokenBalanceDispatchContext)
  if (context === undefined)
    throw new Error(
      'useTokenBalanceDispatch must be called within a TokenBalanceProvider'
    )
  return context
}

export async function tokenBalance (dispatch) {
  dispatch({ type: tokenBalanceActions.TOKEN_BALANCE_REQUEST })
  try {
    const uri = `/blockchain/contracts/token/${IXPS}/balanceOf`
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      dispatch({
        type: tokenBalanceActions.TOKEN_BALANCE_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: tokenBalanceActions.TOKEN_BALANCE_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: tokenBalanceActions.TOKEN_BALANCE_FAILURE,
      payload: { message: 'Failed to get token balance.' }
    })
  }
}
