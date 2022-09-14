import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { useMutation, useQueryCache } from 'react-query'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { investQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { generatePath, useHistory, useParams } from 'react-router-dom'

export const useUpdateDSO = (
  dsoId: string,
  issuerId: string,
  callbacks?: QueryOrMutationCallbacks<DigitalSecurityOffering>
) => {
  const { apiService, snackbarService } = useServices()
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const { replace } = useHistory()
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const queryCache = useQueryCache()

  const url = issuanceURL.dso.update(issuerId ?? userId, dsoId)
  const updateDSO = async (args: DSORequestArgs) => {
    const { network, ...rest } = args
    return await apiService.put<DigitalSecurityOffering>(url, rest)
  }

  return useMutation(updateDSO, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
      replace(generatePath(IssuanceRoute.edit, params))

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
