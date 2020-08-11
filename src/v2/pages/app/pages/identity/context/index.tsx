import { useContext, createContext } from 'react'

import { IdentityPageStore } from './store'

const initialState = new IdentityPageStore()

export const StoreContext = createContext<IdentityPageStore>(initialState)

export const useStore = (): IdentityPageStore => useContext(StoreContext)
