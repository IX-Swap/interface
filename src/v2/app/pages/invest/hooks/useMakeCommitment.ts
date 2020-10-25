import { useServices } from 'v2/hooks/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { MakeInvestmentArgs } from 'v2/types/commitment'
import { useMutation } from 'react-query'
import { useOfferingsRouter } from 'v2/app/pages/invest/routers/offeringsRouter'
import { getIdFromObj } from 'v2/helpers/strings'

export const useMakeCommitment = () => {
  const { apiService, snackbarService } = useServices()
  const { replace, params } = useOfferingsRouter()
  const { user } = useAuth()
  const uri = `/issuance/commitments/${getIdFromObj(user)}`
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
