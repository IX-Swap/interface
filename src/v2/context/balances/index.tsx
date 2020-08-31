import { BalancesStore } from 'v2/context/balances/store'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

const store = new BalancesStore()

export const {
  useStore: useBalancesStore,
  Provider: BalancesStoreProvider
} = generateStoreHookAndProvider<BalancesStore>(store)
