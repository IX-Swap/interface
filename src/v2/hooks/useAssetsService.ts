import { assetsService } from 'v2/services/assets'
import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'

export const {
  useStore: useAssetsService,
  Provider: AssetsServiceProvider
} = generateStoreHookAndProvider<typeof assetsService>(assetsService)
