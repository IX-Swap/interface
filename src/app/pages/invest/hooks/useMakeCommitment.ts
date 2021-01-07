import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { MakeInvestmentArgs } from 'types/commitment'
import { useMutation } from 'react-query'
import { DSORoute } from 'app/pages/invest/router/config'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { useHistory } from 'react-router-dom'

export const useMakeCommitment = () => {
  const { apiService, snackbarService } = useServices()
  const {
    replace,
    location: { state }
  } = useHistory()
  const { user } = useAuth()
  const uri = issuanceURL.commitments.getAll(getIdFromObj(user))
  const mutateFn = async (args: MakeInvestmentArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
      replace(DSORoute.view, state)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
