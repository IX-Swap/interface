import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { queryCache, useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { investQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { useHistory, useParams } from 'react-router-dom'

export const useUpdateDSO = (
  dsoId: string,
  callbacks?: QueryOrMutationCallbacks<DigitalSecurityOffering>
) => {
  const { apiService, snackbarService } = useServices()
  const params = useParams<{ dsoId: string }>()
  const { replace } = useHistory()
  const { user } = useAuth()
  const url = issuanceURL.dso.update(getIdFromObj(user), dsoId)
  const updateDSO = async (args: DSORequestArgs) => {
    const { network, ...rest } = args
    return await apiService.put<DigitalSecurityOffering>(url, rest)
  }

  return useMutation(updateDSO, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
      replace(IssuanceRoute.view, params)

      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries([
        investQueryKeys.getDSOById,
        params.dsoId
      ])
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}
