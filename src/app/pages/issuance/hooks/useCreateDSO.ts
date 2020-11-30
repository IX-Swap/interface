import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { getIdFromObj } from 'helpers/strings'
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
