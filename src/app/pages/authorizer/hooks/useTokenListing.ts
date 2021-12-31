import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'

export const useTokenListing = () => {
  const { dsoId } = useParams<{ dsoId: string }>()
  const { apiService, snackbarService } = useServices()
  const setCustody = async (args: any) => {
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
