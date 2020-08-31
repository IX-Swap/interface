import { AssetsStore } from './store'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

const store = new AssetsStore()

export const {
  useStore: useAssetsStore,
  Provider: AssetsProvider
} = generateStoreHookAndProvider<AssetsStore>(store)
