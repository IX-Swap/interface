import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { queryCache, useMutation } from 'react-query'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { USE_DSO_BY_ID_QUERY_KEY } from 'app/pages/invest/hooks/useDSOById'
import { getIdFromObj } from 'helpers/strings'

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
