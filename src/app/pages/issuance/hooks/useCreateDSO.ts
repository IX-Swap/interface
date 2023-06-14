import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DSORequestArgsStep1 } from 'types/dso'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'

export const useCreateDSO = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const issuerId: any = sessionStorage.getItem('issuerId')
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const url = issuerId
    ? issuanceURL.dso.create(issuerId)
    : issuanceURL.dso.create(getIdFromObj(user))

  const createDSO = async (args: DSORequestArgsStep1) => {
    return await apiService.post(url, args)
  }

  return useMutation(createDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      if (error.message === 'Invalid STO') {
      } else {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  })
}
