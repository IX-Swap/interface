// @flow
import React from 'react'
import type { Node } from 'react'
import logger from 'use-reducer-logger'
import { investReducer } from './reducers'
import { initialState } from './state'

const StateContext = React.createContext<any>()
const DispatchContext = React.createContext()

export const InvestProvider = ({ children }: { children: Node }) => {
  const thisReducer = process.env.NODE_ENV === 'development'
    ? logger(investReducer)
    : investReducer

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

export const useInvestState = () => {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useInvestState must be used within a InvestProvider')
  }

  return context
}

export const useInvestDispatch = () => {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useInvestDispatch must be used within a InvestProvider')
  }

  return context
}
