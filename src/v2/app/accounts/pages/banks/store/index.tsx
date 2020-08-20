import { useContext, createContext } from 'react'

import { AccountsBanksModuleStore } from 'v2/app/accounts/pages/banks/store/store'

const initialState = new AccountsBanksModuleStore()

export const StoreContext = createContext<AccountsBanksModuleStore>(
  initialState
)

export const useStore = (): AccountsBanksModuleStore => useContext(StoreContext)
