import { useSnackbar as useNotistack, VariantType } from 'notistack'

export interface SnackbarService {
  showSnackbar: (message: string, variant?: VariantType) => any
}

export const useSnackbar = () => {
  const { enqueueSnackbar } = useNotistack()

  return {
    showSnackbar: (message: string, variant: VariantType = 'success') => {
      return enqueueSnackbar(message, { variant })
    }
  }
}
