import PasswordResetStore from 'auth/context/password-reset/store'
import generateStoreHookAndProvider from 'helpers/generateStoreHookAndProvider'

const store = new PasswordResetStore()
export const {
  Provider: PasswordResetProvider,
  useStore: usePasswordResetStore
} = generateStoreHookAndProvider(store)
