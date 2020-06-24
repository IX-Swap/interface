import { useContext, createContext } from 'react'

import { LayoutStore } from './store'

const initialState = new LayoutStore()

export const StoreContext = createContext<LayoutStore>(initialState)

export const useStore = (): LayoutStore => useContext(StoreContext)
