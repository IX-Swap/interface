import React from 'react'
import logger from '../v2/helpers/logger'
import { getRequest } from '../services/httpRequests'

export const TokenListStateContext = React.createContext()
export const TokenListDispatchContext = React.createContext()

const tokenListActions = {
  TOKEN_LIST_REQUEST: 'TOKEN_LIST_REQUEST',
  TOKEN_LIST_SUCCESS: 'TOKEN_LIST_SUCCESS',
  TOKEN_LIST_FAILURE: 'TOKEN_LIST_FAILURE'
}

export function tokenListReducer (state, action) {
  switch (action.type) {
    case tokenListActions.TOKEN_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Requesting list of tokens...',
        data: []
      }
    case tokenListActions.TOKEN_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case tokenListActions.TOKEN_LIST_FAILURE:
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

export function TokenListProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(tokenListReducer)
      : tokenListReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <TokenListStateContext.Provider value={state}>
      <TokenListDispatchContext.Provider value={dispatch}>
        {children}
      </TokenListDispatchContext.Provider>
    </TokenListStateContext.Provider>
  )
}

export function useTokenListState () {
  const context = React.useContext(TokenListStateContext)
  if (context === undefined) {
    throw new Error('useTokenListState must be called in a TokenListProvider')
  }
  return context
}

export function useTokenListDispatch () {
  const context = React.useContext(TokenListDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useTokenListDispatch must be called within a TokenListProvider'
    )
  }
  return context
}

export async function tokenList (dispatch) {
  dispatch({ type: tokenListActions.TOKEN_LIST_REQUEST })
  try {
    const uri = '/blockchain/contracts/tokens'
    const result = await getRequest(uri)
    const response = await result.json()
    if (result.status === 200) {
      dispatch({
        type: tokenListActions.TOKEN_LIST_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: tokenListActions.TOKEN_LIST_FAILURE,
        payload: response
      })
    }
  } catch (err) {
    dispatch({
      type: tokenListActions.TOKEN_LIST_FAILURE,
      payload: { message: 'Failed to get token list.' }
    })
  }
}
