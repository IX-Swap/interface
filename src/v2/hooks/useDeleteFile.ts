import { useServices } from 'v2/services/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useMutation } from 'react-query'

export const useDeleteFile = (fileId: string) => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const url = `/dataroom/${user?._id ?? ''}/${fileId}`
  const deleteFile = async () => {
    return await apiService.delete(url, {})
  }

  return useMutation(deleteFile, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: () => {
      void snackbarService.showSnackbar('Error', 'error')
    }
  })
}
