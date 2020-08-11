//
import React from 'react'

import logger from '../../../../../../v2/helpers/logger'
import { listViewReducer } from './reducers'
import { initialState } from './state'

const ListViewStateContext = React.createContext(initialState)
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
    throw new Error(
      'useListViewDispatch must be used within a ListViewProvider'
    )
  }

  return context
}

export function ListViewProvider ({ children }) {
  const thisReducer =
    process.env.NODE_ENV === 'development'
      ? logger(listViewReducer)
      : listViewReducer
  const [state, dispatch] = React.useReducer(thisReducer, initialState)

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
