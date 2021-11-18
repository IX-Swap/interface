import generateStoreHookAndProvider from 'helpers/generateStoreHookAndProvider'
import apiService from 'services/api'
import socketService from 'services/socket'
import storageService from 'services/storage'
import { adminService } from 'app/pages/admin/service'
import { useSnackbar, SnackbarService } from 'hooks/useSnackbar'
import { isTestENV } from 'config/history'
import { web3Service } from 'services/web3'

export interface AppServices {
  apiService: typeof apiService
  socketService: typeof socketService
  storageService: typeof storageService
  adminService: typeof adminService
  snackbarService: SnackbarService
  web3Service: typeof web3Service
}

const services = {
  apiService,
  socketService,
  storageService,
  adminService,
  web3Service,
  snackbarService: null
}

export const { useStore: useServices, Provider: ServicesProvider } =
  generateStoreHookAndProvider<AppServices>(services as any, context => {
    if (!isTestENV) {
      context.snackbarService = useSnackbar()
    }
  })
