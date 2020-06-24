import { useContext, createContext } from 'react'

import { AssetStore } from './store'

const initialState = new AssetStore()

export const StoreContext = createContext<AssetStore>(initialState)

export const useStore = (): AssetStore => useContext(StoreContext)
