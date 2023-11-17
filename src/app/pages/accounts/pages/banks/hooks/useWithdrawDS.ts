import { useMutation } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
// import { WithdrawDSArgs } from 'app/pages/accounts/types'
import { useDepositStore } from 'app/pages/accounts/pages/banks/context'
import { DepositStoreStep } from 'app/pages/accounts/pages/banks/context/store'
import { getIdFromObj } from 'helpers/strings'
import { accountsURL } from 'config/apiURL'

export const useWithdrawDS = () => {
  const { apiService, snackbarService } = useServices()
  const { user } = useAuth()
  const { setCurrentStep } = useDepositStore()
  const uri = accountsURL.dsWithdrawals.create(getIdFromObj(user))

  //   const withdrawDS = async (args: WithdrawDSArgs) => {
  const withdrawDS = async (args: {
    asset: string
    withdrawalAddress: string
    amount: string
    memo: string
    otp: string
  }) => {
    return await apiService.post(uri, args)
  }

  return useMutation(withdrawDS, {
    onSuccess: data => {
      void snackbarService.showSnackbar(data.message, 'success')
      setCurrentStep(DepositStoreStep.SUCCESS)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
