import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { DigitalSecurityOffering, DSORequestArgs } from 'types/dso'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { generatePath, useHistory } from 'react-router-dom'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

export const useCreateDSO = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const { replace } = useHistory()
  const url = issuanceURL.dso.create(getIdFromObj(user))
  const createDSO = async (args: DSORequestArgs) => {
    return await apiService.post<DigitalSecurityOffering>(url, args)
  }

  return useMutation(createDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')

      replace(
        generatePath(IssuanceRoute.view, {
          dsoId: data.data._id,
          issuerId: data.data.user
        })
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
