import { Setup2faStore } from './store'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

const store = new Setup2faStore()

export const {
  Provider: Setup2faProvider,
  useStore: useSetup2faStore
} = generateStoreHookAndProvider<Setup2faStore>(store)
