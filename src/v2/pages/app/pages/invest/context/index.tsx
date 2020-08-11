
import React, { useContext, createContext } from 'react'

import { InvestStore } from './store'

const initialState = new InvestStore()

export const StoreContext = createContext<InvestStore>(initialState)
export const StoreProvider = StoreContext.Provider

export function InvestProvider ({ children }: { children: Node }) {
  return <StoreProvider value={initialState}>{children}</StoreProvider>
}

export const useStore = (): InvestStore => {
  const store = useContext(StoreContext)
  return store
}
