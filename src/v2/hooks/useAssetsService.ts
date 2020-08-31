import { assetsService } from 'v2/context/assets/service'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

export const {
  useStore: useAssetsService,
  Provider: AssetsServiceProvider
} = generateStoreHookAndProvider<typeof assetsService>(assetsService)
