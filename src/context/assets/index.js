// @flow
import React from 'react'
import logger from 'use-reducer-logger'
import type { Node } from 'react'
import { initialState } from './state'
import assetsReducer from './reducers'

import type { AssetsListState } from './types'

const StateContext = React.createContext<AssetsListState>(initialState)
const DispatchContext = React.createContext()

export function useAssetsState (): AssetsListState {
  const context = React.useContext<AssetsListState>(StateContext)
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

export function AssetsProvider ({ children }: { children?: Node }) {
  const thisReducer = process.env.NODE_ENV === 'development'
    ? logger(assetsReducer)
    : assetsReducer

  const [state, dispatch] = React.useReducer<AssetsListState, AssetsListState>(
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
