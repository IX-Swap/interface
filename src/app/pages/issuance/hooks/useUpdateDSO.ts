import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { useMutation, useQueryCache } from 'react-query'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { investQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'

export const useUpdateDSO = (
  dsoId: string,
  issuerId: string,
  callbacks?: QueryOrMutationCallbacks<DigitalSecurityOffering>
) => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const queryCache = useQueryCache()

  const url = issuanceURL.dso.update(issuerId ?? userId, dsoId)
  const updateDSO = async (args: DSORequestArgs) => {
    // const { network, ...rest } = args
    return await apiService.put<DigitalSecurityOffering>(url, args)
  }

  return useMutation(updateDSO, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)

      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries(
        investQueryKeys.getDSOById(dsoId, issuerId)
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}
