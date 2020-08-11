import React, { useContext, createContext } from 'react'

import { BalancesStore } from './store'

const initialState = new BalancesStore()

export const StoreContext = createContext<BalancesStore>(initialState)
export const StoreProvider = StoreContext.Provider

export function BalancesProvider ({ children }: { children: Node }) {
  return <StoreProvider value={initialState}>{children}</StoreProvider>
}

export const useStore = (): BalancesStore => {
  const store = useContext(StoreContext)
  return store
}
