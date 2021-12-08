import generateStoreHookAndProvider from 'helpers/generateStoreHookAndProvider'
import apiService from 'services/api'

export const { useStore: useAPIService, Provider: APIServiceProvider } =
  generateStoreHookAndProvider<typeof apiService>(apiService)
