// @flow
import React from 'react'
import type { Node } from 'react'
import logger from 'use-reducer-logger'
import { listViewReducer } from './reducers'
import { initialState } from './state'
import type { ListingViewState } from './types'

const ListViewStateContext = React.createContext<ListingViewState>(initialState)
const ListViewDispatchContext = React.createContext()

export function ListViewState () {
  const context = React.useContext(ListViewStateContext)
  if (context === undefined) {
    throw new Error('ListViewState must be used within a ListViewProvider')
  }

  return context
}

export function useListViewDispatch () {
  const context = React.useContext(ListViewDispatchContext)
  if (context === undefined) {
    throw new Error('useListViewDispatch must be used within a ListViewProvider')
  }

  return context
}

export function ListViewProvider ({ children }: { children: Node }) {
  const thisReducer =
    process.env.NODE_ENV === 'development' ? logger(listViewReducer) : listViewReducer
  const [state, dispatch] = React.useReducer<ListingViewState, ListingViewState>(
    thisReducer,
    initialState
  )

  return (
    <ListViewStateContext.Provider value={state}>
      <ListViewDispatchContext.Provider value={dispatch}>
        {children}
      </ListViewDispatchContext.Provider>
    </ListViewStateContext.Provider>
  )
}

export default {
  ListViewProvider,
  useListViewDispatch,
  ListViewState
}
