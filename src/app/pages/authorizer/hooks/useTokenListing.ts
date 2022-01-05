import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'

export const useTokenListing = () => {
  const { dsoId } = useParams<{ dsoId: string }>()
  const { apiService, snackbarService } = useServices()
  const setCustody = async (args: any) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await apiService.post(`/custody/hex-token-listing/${dsoId}`, args)
  }

  return useMutation(setCustody, {
    onSuccess: (data: any) => {
      void snackbarService.showSnackbar(data?.data ?? 'Success', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error?.message, 'error')
    }
  })
}
