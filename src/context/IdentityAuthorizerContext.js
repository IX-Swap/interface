import React from 'react'
import logger from '../v2/helpers/logger'

// constants
const StateContext = React.createContext()
const DispatchContext = React.createContext()

const actions = {}

export const IDENTITY_STATUS = {
  INIT: 'INIT',
  IDLE: 'IDLE',
  GETTING: 'GETTING',
  SAVING: 'SAVING'
}

const STATUS = IDENTITY_STATUS

const initialState = {
  identity: {},
  status: STATUS.INIT,
  passwordResetMessage: '',
  resetStatus: false,
  resetComplete: false,
  shouldCreateNew: false,
  error: {
    save: null,
    get: null
  }
}

// reducer
export function identityAuthorizerReducer (state, { type, payload }) {
  switch (type) {
    case actions.GET_IDENTITY_REQUEST:
      return {
        ...state,
        status: STATUS.GETTING,
        error: { ...state.error, get: null }
      }

    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

// password-reset and hooks
export function IdentityAuthorizerProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(identityAuthorizerReducer)
      : identityAuthorizerReducer

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useIdentityAuthorzierState () {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error(
      'useIdentityAuthorizerState must be used within a IdentityAuthorizerProvider'
    )
  }
  return context
}

export function useIdentityAuthorizerDispatch () {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error(
      'useIdentityAuthorizerDispatch must be used within a IdentityAuthorizerProvider'
    )
  }
  return context
}
