import { DepositStore } from 'app/pages/accounts/pages/banks/context/store'
import generateStoreHookAndProvider from 'helpers/generateStoreHookAndProvider'

const store = new DepositStore()

export const { useStore: useDepositStore, Provider: DepositStoreProvider } =
  generateStoreHookAndProvider<DepositStore>(store)
