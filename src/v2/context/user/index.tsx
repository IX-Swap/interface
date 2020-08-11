import React, { useContext, createContext } from 'react'
import { UserStore } from './store'
import storageHelper from '../../helpers/storageHelper'

const userStore = new UserStore()

export const StoreContext = createContext<UserStore>(userStore)
export const StoreProvider = StoreContext.Provider

export const UserProvider: React.FC = ({ children }) => (
  <StoreProvider value={userStore}>{children}</StoreProvider>
)

export const useUserStore = () => {
  const store = useContext(StoreContext)
  if (!store.user) {
    store.hydrate(storageHelper.get())
  }

  return store
}
