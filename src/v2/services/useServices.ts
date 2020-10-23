import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'
import apiService from 'v2/services/api'
import socketService from 'v2/services/socket'
import storageService from 'v2/services/storage'
import { adminService } from 'v2/app/pages/admin/service'
import { snackbarService } from 'uno-material-ui'

const services = {
  apiService,
  socketService,
  storageService,
  adminService,
  snackbarService
}

export const {
  useStore: useServices,
  Provider: ServicesProvider
} = generateStoreHookAndProvider<typeof services>(services)
