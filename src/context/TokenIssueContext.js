import React from 'react'
import logger from 'use-reducer-logger'
import { postRequest } from './httpRequests'

const TokenIssueStateContext = React.createContext()
const TokenIssueDispatchContext = React.createContext()

export const tokenIssueActions = {
  TOKEN_ISSUE_REQUEST: 'TOKEN_ISSUE_REQUEST',
  TOKEN_ISSUE_SUCCESS: 'TOKEN_ISSUE_SUCCESS',
  TOKEN_ISSUE_FAILURE: 'TOKEN_ISSUE_FAILURE'
}

export function tokenIssueReducer (state, action) {
  switch (action.type) {
    case tokenIssueActions.TOKEN_ISSUE_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
        message: 'Loading',
        data: null
      }
    case tokenIssueActions.TOKEN_ISSUE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        message: action.payload.message,
        data: action.payload.data
      }
    case tokenIssueActions.TOKEN_ISSUE_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload.message,
        messsage: null,
        data: []
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export function TokenIssueProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(tokenIssueReducer)
      : tokenIssueReducer
  const [state, dispatch] = React.useReducer(thisReducer, {
    isLoading: false,
    success: false,
    error: null,
    message: null,
    data: null
  })
  return (
    <TokenIssueStateContext.Provider value={state}>
      <TokenIssueDispatchContext.Provider value={dispatch}>
        {children}
      </TokenIssueDispatchContext.Provider>
    </TokenIssueStateContext.Provider>
  )
}

export function useTokenIssueState () {
  const context = React.useContext(TokenIssueStateContext)
  if (context === undefined) {
    throw new Error('tokenIssueState must be used within a TokeIssueProvider')
  }
  return context
}

export function useTokenIssueDispatch () {
  const context = React.useContext(TokenIssueDispatchContext)
  if (context === undefined) {
    throw new Error(
      'TokenIssueDispatch must be used within a TokenIssueProvider'
    )
  }
  return context
}

async function issueTokens (dispatch, tokenHolder, symbol, amount) {
  dispatch({ type: tokenIssueActions.TOKEN_ISSUE_REQUEST })
  try {
    const uri = `/blockchain/contracts/token/${symbol}/issue`
    const result = await postRequest(uri, { tokenHolder, amount })
    const response = await result.json()
    if (result.status === 200) {
      dispatch({
        type: tokenIssueActions.TOKEN_ISSUE_SUCCESS,
        payload: response
      })
    } else {
      dispatch({
        type: tokenIssueActions.TOKEN_ISSUE_FAILURE,
        payload: response.message || { message: 'Failed to issue tokens.' }
      })
    }
  } catch (err) {
    dispatch({
      type: tokenIssueActions.TOKEN_ISSUE_FAILURE,
      payload: { message: 'We failed to issue the tokens.' }
    })
  }
}

export { issueTokens }
