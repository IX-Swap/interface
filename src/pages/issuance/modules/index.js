//
import React from 'react'

import logger from '../v2/helpers/logger'
import { issuanceReducer } from './reducers'
import { initialState } from './state'

const StateContext = React.createContext()
const DispatchContext = React.createContext()

export const IssuanceProvider = ({ children }) => {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(issuanceReducer)
      : issuanceReducer

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export const useIssuanceState = () => {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useIssuanceState must be used within a IssuanceProvider')
  }

  return context
}

export const useIssuanceDispatch = () => {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error(
      'useIssuanceDispatch must be used within a IssuanceProvider'
    )
  }

  return context
}
