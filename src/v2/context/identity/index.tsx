import React, { useContext, createContext } from 'react'

import { IdentityStore } from './store'

const initialState = new IdentityStore()

export const StoreContext = createContext<IdentityStore>(initialState)
export const StoreProvider = StoreContext.Provider

export function UserProvider({ children }: { children: Node }) {
  return <StoreProvider value={initialState}>{children}</StoreProvider>
}

export const useStore = (): IdentityStore => {
  const store = useContext(StoreContext)
  return store
}
