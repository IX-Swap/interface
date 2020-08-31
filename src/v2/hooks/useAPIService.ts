import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'
import apiService from 'v2/services/api'

export const {
  useStore: useAPIService,
  Provider: APIServiceProvider
} = generateStoreHookAndProvider<typeof apiService>(apiService)
