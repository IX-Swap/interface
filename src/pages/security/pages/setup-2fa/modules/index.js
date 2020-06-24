// @flow
import React from 'react'
import type { Node } from 'react'
import logger from 'use-reducer-logger'
import { twoFactorReducer } from './reducers'
import { initialState } from './state'

const StateContext = React.createContext<any>()
const DispatchContext = React.createContext()

export const TwoFactorProvider = ({ children }: { children: Node }) => {
  const thisReducer = process.env.NODE_ENV === 'development'
    ? logger(twoFactorReducer)
    : twoFactorReducer

  const [state, dispatch] = React.useReducer<any, any>(
    thisReducer,
    initialState
  )

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
