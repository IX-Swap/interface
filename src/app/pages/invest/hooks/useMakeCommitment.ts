import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { MakeInvestmentArgs } from 'types/commitment'
import { useMutation } from 'react-query'
import { useOfferingsRouter } from 'app/pages/invest/routers/offeringsRouter'
import { getIdFromObj } from 'helpers/strings'
import { issuanceURL } from 'config/apiURL'

export const useMakeCommitment = () => {
  const { apiService, snackbarService } = useServices()
  const { replace, params } = useOfferingsRouter()
  const { user } = useAuth()
  const uri = issuanceURL.commitments.getAll(getIdFromObj(user))
  const mutateFn = async (args: MakeInvestmentArgs) => {
    return await apiService.post(uri, args)
  }

  return useMutation(mutateFn, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
      replace('view', params)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
