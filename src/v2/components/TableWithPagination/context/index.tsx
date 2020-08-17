import { useContext, createContext } from 'react'

import { TableWithPaginationStore } from './store'

const memo: { [key: string]: { useStore: Function } } = {}

export function init<T>(key: string, uri: string) {
  if (memo[key]) return memo[key]

  const initialState = new TableWithPaginationStore<T>(uri, {})
  const StoreContext = createContext<TableWithPaginationStore<T>>(initialState)
  const useStore = (): TableWithPaginationStore<T> => useContext(StoreContext)

  memo[key] = {
    useStore
  }

  return memo[key]
}
