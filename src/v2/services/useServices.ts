import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'
import apiService from 'v2/services/api'
import { assetsService } from 'v2/services/assets'
import { balancesService } from 'v2/services/balance'
import { identityService } from 'v2/services/identity'
import socketService from 'v2/services/socket'
import storageService from 'v2/services/storage'
import authService from 'v2/auth/service'
import { banksService } from 'v2/app/pages/accounts/pages/banks/service'
import { adminService } from 'v2/app/pages/admin/service'
import { changePasswordService } from 'v2/app/pages/security/pages/changePassword/service'
import { setup2faService } from 'v2/app/pages/security/pages/setup2fa/service'
import { snackbarService } from 'uno-material-ui'

const services = {
  apiService,
  authService,
  assetsService,
  balancesService,
  banksService,
  identityService,
  socketService,
  storageService,
  adminService,
  snackbarService,
  setup2faService,
  changePasswordService
}

export const {
  useStore: useServices,
  Provider: ServicesProvider
} = generateStoreHookAndProvider<typeof services>(services)
