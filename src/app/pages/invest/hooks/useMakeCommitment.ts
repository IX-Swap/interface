import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { MakeInvestmentArgs } from 'types/commitment'
import { useMutation } from 'react-query'
import { InvestRoute } from 'app/pages/invest/router/config'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'
import { generatePath, useHistory, useParams } from 'react-router-dom'

export const useMakeCommitment = () => {
  const { apiService, snackbarService } = useServices()
  const params = useParams<{ dsoId: string; issuerId: string }>()
  const { replace } = useHistory()
  const { user } = useAuth()
  const uri = issuanceURL.commitments.getAll(getIdFromObj(user))
  const mutateFn = async (args: MakeInvestmentArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
      replace(generatePath(InvestRoute.view, params))
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
