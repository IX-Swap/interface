import { useContext, createContext } from 'react'

import { IdentityPageStore } from 'v2/app/pages/identity/context/store'

const initialState = new IdentityPageStore()

export const StoreContext = createContext<IdentityPageStore>(initialState)

export const useStore = (): IdentityPageStore => useContext(StoreContext)
