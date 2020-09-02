import { AuthorizerTableStore } from 'v2/app/pages/authorizer/context/store'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

const store = new AuthorizerTableStore()

export const {
  Provider: AuthorizerTableStoreProvider,
  useStore: useAuthorizerTableStore
} = generateStoreHookAndProvider<AuthorizerTableStore>(store)
