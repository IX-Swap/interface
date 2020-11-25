import { useServices } from 'v2/hooks/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'v2/types/dso'
import { queryCache, useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from 'v2/hooks/types'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { USE_DSO_BY_ID_QUERY_KEY } from 'v2/app/pages/invest/hooks/useDSOById'
import { getIdFromObj } from 'v2/helpers/strings'

export const useUpdateDSO = (
  dsoId: string,
  callbacks?: QueryOrMutationCallbacks<DigitalSecurityOffering>
) => {
  const { apiService, snackbarService } = useServices()
  const { params, replace } = useIssuanceRouter()
  const { user } = useAuth()
  const url = `/issuance/dso/${getIdFromObj(user)}/${dsoId}`
  const updateDSO = async (args: DSORequestArgs) => {
    const { network, ...rest } = args
    return await apiService.put<DigitalSecurityOffering>(url, rest)
  }

  return useMutation(updateDSO, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
      replace('view', params)

      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries([USE_DSO_BY_ID_QUERY_KEY, params.dsoId])
      void queryCache.refetchQueries([USE_DSO_BY_ID_QUERY_KEY, params.dsoId])
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}
