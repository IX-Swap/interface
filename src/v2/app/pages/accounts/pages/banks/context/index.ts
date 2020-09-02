import { DepositStore } from 'v2/app/pages/accounts/pages/banks/context/store'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

const store = new DepositStore()

export const {
  useStore: useDepositStore,
  Provider: DepositStoreProvider
} = generateStoreHookAndProvider<DepositStore>(store)
