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
  const uri = issuanceURL.commitments.invest(getIdFromObj(user))
  const mutateFn = async (args: MakeInvestmentArgs) => {
    return await apiService.post(uri, args)
  }

  const commitUri = issuanceURL.commitments.commit(getIdFromObj(user))
  const commitMutateFn = async (args: MakeInvestmentArgs) => {
    return await apiService.post(commitUri, args)
  }

  const successHandler = () => {
    void snackbarService.showSnackbar(
      "Success. Please wait for the authorizer's approval",
      'success'
    )
    replace(generatePath(InvestRoute.view, params))
  }

  const errorHandler = (error: any) => {
    void snackbarService.showSnackbar(
      error.message ?? 'Something went wrong',
      'error'
    )
  }

  return {
    invest: useMutation(mutateFn, {
      onSuccess: successHandler,
      onError: errorHandler
    }),
    commit: useMutation(commitMutateFn, {
      onSuccess: successHandler,
      onError: errorHandler
    })
  }
}
