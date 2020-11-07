import { useServices } from 'v2/hooks/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'v2/types/dso'
import { useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from 'v2/hooks/types'
import { getIdFromObj } from 'v2/helpers/strings'
import { useIssuanceRouter } from '../router'

export const useCreateDSO = (
  callbacks?: QueryOrMutationCallbacks<DigitalSecurityOffering>
) => {
  const { apiService, snackbarService } = useServices()
  const { replace } = useIssuanceRouter()
  const { user } = useAuth()
  const url = `/issuance/dso/${getIdFromObj(user)}`
  const createDSO = async (args: DSORequestArgs) => {
    return await apiService.post<DigitalSecurityOffering>(url, args)
  }

  return useMutation(createDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
      callbacks?.onSuccess?.(data)
      replace('view', { dsoId: data.data._id })
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}
