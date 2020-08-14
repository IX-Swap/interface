import PasswordResetStore from 'v2/auth/context/password-reset/store'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

const store = new PasswordResetStore()
export const {
  Provider: PasswordResetProvider,
  useStore: usePasswordResetStore
} = generateStoreHookAndProvider(store)
