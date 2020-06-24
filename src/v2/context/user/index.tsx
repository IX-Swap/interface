
import React, { useContext, createContext } from 'react'

import { UserStore } from './store'

import storageHelper from '../../helpers/storageHelper'

const initialState = new UserStore()

export const StoreContext = createContext<UserStore>(initialState)
export const StoreProvider = StoreContext.Provider

export function UserProvider ({ children }: { children: Node }) {
  return <StoreProvider value={initialState}>{children}</StoreProvider>
}

export const useStore = (): UserStore => {
  const store = useContext(StoreContext)
  if (!store.user) {
    store.hydrate(storageHelper.get())
  }

  return store
}
