import { IssuanceStore } from 'v2/app/pages/issuance/context/store'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

const store = new IssuanceStore()

export const {
  Provider: IssuanceStoreProvider,
  useStore: useIssuanceStore
} = generateStoreHookAndProvider(store)
