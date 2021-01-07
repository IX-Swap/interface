import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const useCreateDSO = (
  callbacks?: QueryOrMutationCallbacks<DigitalSecurityOffering>
) => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const { replace } = useHistory()
  const url = issuanceURL.dso.create(getIdFromObj(user))
  const createDSO = async (args: DSORequestArgs) => {
    return await apiService.post<DigitalSecurityOffering>(url, args)
  }

  return useMutation(createDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
      callbacks?.onSuccess?.(data)
      replace(IssuanceRoute.view, { dsoId: data.data._id })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}
