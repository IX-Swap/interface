import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { NewDigitalSecurityOffering, DSORequestArgsStep1 } from 'types/dso'
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
  const createDSO = async (args: DSORequestArgsStep1) => {
    return await apiService.post<NewDigitalSecurityOffering>(url, args)
  }

  return useMutation(createDSO, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')

      replace(
        generatePath(IssuanceRoute.edit, {
          dsoId: data.data._id,
          issuerId:
            typeof data.data.user === 'string'
              ? data.data.user
              : getIdFromObj(data.data.user)
        })
      )
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
