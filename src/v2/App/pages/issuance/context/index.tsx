import React, { useContext, createContext } from 'react'

import { IssuanceStore } from './store'

const initialState = new IssuanceStore()

export const StoreContext = createContext<IssuanceStore>(initialState)
export const StoreProvider = StoreContext.Provider

export function InvestProvider({ children }: { children: Node }) {
  return <StoreProvider value={initialState}>{children}</StoreProvider>
}

export const useStore = (): IssuanceStore => {
  const store = useContext(StoreContext)
  return store
}
