import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { CustodyAccount } from 'types/custodyAccount'
import { custodyAccount } from 'config/apiURL'
import { errorCodes } from 'services/api/errorCodes'
interface props {
  userId: string
  onSuccess: ({ response }: { response: CustodyAccount }) => Promise<any>
  onError: () => void
}

export const useExistsCustodianWallet = ({
  userId,
  onSuccess,
  onError
}: props) => {
  const { apiService, snackbarService } = useServices()
  const url = `${custodyAccount.get(userId)}`
  const checkExistsCustodianWallet = async () => {
    return await apiService.get<CustodyAccount>(url)
  }

  return useMutation(checkExistsCustodianWallet, {
    onSuccess: async (data: any) => {
      await onSuccess({ response: data?.data })
    },
    onError: (error: any) => {
      if (error?.code === errorCodes.COULD_NOT_GET_CUSTODY_ACCOUNT) {
        onError()
      } else {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  })
}
