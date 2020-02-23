import React from 'react'
import logger from 'use-reducer-logger'

const TokenTransferStateContext = React.useContext()
const TokenTransferDispatchContext = React.useContext()

export const tokenTransferActions = {
  TOKEN_TRANSFER_REQUEST: 'TOKEN_TRANSFER_REQUEST',
  TOKEN_TRANSFER_SUCCESS: 'TOKEN_TRANSFER_SUCCESS',
  TOKEN_TRANSFER_FAILURE: 'TOKEN_TRANSFER_FAILURE'
}

export function tokenTransferReducer (state, action) {
  switch(action.type) {
    case tokenTransferActions.TOKEN_TRANSFER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        message: 'Loading',
        data: null
      }
    case tokenTransferActions.TOKEN_TRANSFER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        message: action.payload.message,
        data: action.payload.data

      }
    case tokenTransferActions.TOKEN_TRANSFER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: 'Failed to transfer tokens.',
        message: null,
        data: null
      }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}


export function TokenTansferProvider ({ children }) {
  const thisReducer = process.env.NODE_ENV === 'development'
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
      'tokenTransferState ' +
      'must be used within a ' +
      'TokeTransferProvider'
    )
  }
  return context
}

export function useTokenTransferDispatch () {
  const context = React.useContext(TokenTransferDisptachContext)
  if (context === undefined) {
    throw new Error(
      'tokenTransferDispatch ' +
      'must be used within a ' + 
      'TokenTransferProvider'
    )
  }
  return context
}

