import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { useIssuanceRouter } from '../router'
import { issuanceURL } from 'config/apiURL'

export const useCreateDSO = () => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useIssuanceRouter()
  const { user } = useAuth()
  const url = issuanceURL.dso.create(getIdFromObj(user))
  const createDSO = async (args: DSORequestArgs) => {
    return await apiService.post<DigitalSecurityOffering>(url, args)
  }

  return useMutation(createDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
      replace('view', { dsoId: data.data._id })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
