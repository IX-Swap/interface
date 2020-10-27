import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'
import apiService from 'v2/services/api'
import socketService from 'v2/services/socket'
import storageService from 'v2/services/storage'
import { adminService } from 'v2/app/pages/admin/service'
import { useSnackbar, SnackbarService } from 'v2/hooks/useSnackbar'
import { isTestENV } from 'v2/history'

export interface AppServices {
  apiService: typeof apiService
  socketService: typeof socketService
  storageService: typeof storageService
  adminService: typeof adminService
  snackbarService: SnackbarService
}

const services = {
  apiService,
  socketService,
  storageService,
  adminService,
  snackbarService: null
}

export const {
  useStore: useServices,
  Provider: ServicesProvider
} = generateStoreHookAndProvider<AppServices>(services as any, context => {
  if (!isTestENV) {
    context.snackbarService = useSnackbar()
  }
})
