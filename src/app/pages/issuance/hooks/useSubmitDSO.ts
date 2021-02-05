import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { queryCache, useMutation } from 'react-query'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { investQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'

export const useSubmitDSO = (dsoId: string) => {
  const { apiService, snackbarService } = useServices()
  const { params, replace } = useIssuanceRouter()
  const { user } = useAuth()
  const url = issuanceURL.dso.submit(getIdFromObj(user), dsoId)
  const submitDSO = async (args: DSORequestArgs) => {
    const { network, ...rest } = args
    return await apiService.patch<DigitalSecurityOffering>(url, rest)
  }

  return useMutation(submitDSO, {
    onSuccess: () => {
      replace('view', params)

      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries([
        investQueryKeys.getDSOById,
        params.dsoId
      ])
      void queryCache.refetchQueries([investQueryKeys.getDSOById, params.dsoId])
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
