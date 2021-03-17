import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'
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
  const submitDSO = async () => {
    return await apiService.patch<DigitalSecurityOffering>(url, {})
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
