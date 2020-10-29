import { useServices } from 'v2/hooks/useServices'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'v2/helpers/strings'
import { DataroomFile } from 'v2/types/dataroomFile'

export const useDeleteFile = (fileId: string) => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const url = `/dataroom/${getIdFromObj(user)}/${fileId}`
  const deleteFile = async () => {
    return await apiService.delete<DataroomFile>(url, {})
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
