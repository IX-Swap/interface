//
import React from 'react'
import logger from '../../v2/helpers/logger'

import { initialState } from './state'
import assetsReducer from './reducers'

const StateContext = React.createContext(initialState)
const DispatchContext = React.createContext()

export function useAssetsState () {
  const context = React.useContext(StateContext)
  if (context === undefined) {
    throw new Error('useAssetsState must be used within a AssetsProvider')
  }

  return context
}

export function useAssetsDispatch () {
  const context = React.useContext(DispatchContext)
  if (context === undefined) {
    throw new Error('useAssetsDispatch must be used within a AssetsProvider')
  }

  return context
}

export function AssetsProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(assetsReducer)
      : assetsReducer

  const [state, dispatch] = React.useReducer(thisReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
