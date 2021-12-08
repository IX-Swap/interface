import { UserStore } from './store'
import generateStoreHookAndProvider from 'helpers/generateStoreHookAndProvider'

const userStore = new UserStore()
export const { useStore: useUserStore, Provider: UserProvider } =
  generateStoreHookAndProvider(userStore)
