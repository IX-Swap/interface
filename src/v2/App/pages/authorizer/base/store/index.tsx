import { useContext, createContext } from 'react'

import { AuthorizerTableStore } from './store'

const initialState = new AuthorizerTableStore()

export const StoreContext = createContext<AuthorizerTableStore>(initialState)

export const useStore = (): AuthorizerTableStore => useContext(StoreContext)
