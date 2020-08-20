import { UserStore } from './store'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

const userStore = new UserStore()
export const {
  useStore: useUserStore,
  Provider: UserProvider
} = generateStoreHookAndProvider(userStore)
