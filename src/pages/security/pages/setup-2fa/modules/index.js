//
import React from 'react'

import logger from '../../../../../v2/helpers/logger'
import { twoFactorReducer } from './reducers'
import { initialState } from './state'

const StateContext = React.createContext()
const DispatchContext = React.createContext()

export const TwoFactorProvider = ({ children }) => {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(twoFactorReducer)
      : twoFactorReducer

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useTwoFactorState = () => {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error(
      'useTwoFactorState must be used within a TwoFactorProvider'
    )
  }

  return context
}

export const useTwoFactorDispatch = () => {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error(
      'useTwoFactorDispatch must be used within a TwoFactorProvider'
    )
  }

  return context
}
