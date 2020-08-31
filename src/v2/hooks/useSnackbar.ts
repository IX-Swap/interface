import generateStoreHookAndProvider from 'v2/helpers/generateStoreHookAndProvider'
import { snackbarService } from 'uno-material-ui'

export const {
  useStore: useSnackbar,
  Provider: SnackbarProvider
} = generateStoreHookAndProvider<typeof snackbarService>(snackbarService)
