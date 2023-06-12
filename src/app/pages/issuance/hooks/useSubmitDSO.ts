import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering } from 'types/dso'
import { useMutation, useQueryCache } from 'react-query'
import { investQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { generatePath, useHistory, useParams } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const useSubmitDSO = (dsoId: string) => {
  const { apiService, snackbarService } = useServices()
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const issuerId: any = sessionStorage.getItem('issuerId')
  const { replace } = useHistory()
  const { user } = useAuth()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const url = issuerId
    ? issuanceURL.dso.submit(issuerId, dsoId)
    : issuanceURL.dso.submit(getIdFromObj(user), dsoId)
  // const url = issuanceURL.dso.submit(getIdFromObj(user), dsoId)
  const queryCache = useQueryCache()
  const submitDSO = async (data: any) => {
    return await apiService.patch<DigitalSecurityOffering>(url, data)
  }

  return useMutation(submitDSO, {
    onSuccess: () => {
      replace(generatePath(IssuanceRoute.view, params))

      void snackbarService.showSnackbar('Success', 'success')
      void queryCache.invalidateQueries(
        investQueryKeys.getDSOById(dsoId, params.issuerId)
      )
      sessionStorage.removeItem('issuerId')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
