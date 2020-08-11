import { useContext, createContext } from 'react'

import { AccountsBanksModuleStore } from './store'

const initialState = new AccountsBanksModuleStore()

export const StoreContext = createContext<AccountsBanksModuleStore>(
  initialState
)

export const useStore = (): AccountsBanksModuleStore => useContext(StoreContext)
