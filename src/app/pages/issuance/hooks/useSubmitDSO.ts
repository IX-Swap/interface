import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'
import { queryCache, useMutation } from 'react-query'
import { investQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { useHistory } from 'react-router'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { useParams } from 'react-router-dom'

export const useSubmitDSO = (dsoId: string) => {
  const { apiService, snackbarService } = useServices()
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const { replace } = useHistory()
  const { user } = useAuth()
  const url = issuanceURL.dso.submit(getIdFromObj(user), dsoId)
  const submitDSO = async () => {
    return await apiService.patch<DigitalSecurityOffering>(url, {})
  }

  return useMutation(submitDSO, {
    onSuccess: () => {
      replace(IssuanceRoute.view, params)

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
