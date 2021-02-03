import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { DataroomFile } from 'types/dataroomFile'
import { documentsURL } from 'config/apiURL'
import { QueryOrMutationCallbacks } from 'hooks/types'

export const useDeleteFile = (
  fileId: string,
  callbacks?: QueryOrMutationCallbacks<DataroomFile>
) => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const url = documentsURL.deleteById(getIdFromObj(user), fileId)
  const deleteFile = async () => {
    return await apiService.delete<DataroomFile>(url, {})
  }

  return useMutation(deleteFile, {
    onSuccess: data => {
      void snackbarService.showSnackbar('Success', 'success')
      void callbacks?.onSuccess?.(data)
    },
    onError: error => {
      void snackbarService.showSnackbar('Error', 'error')
      void callbacks?.onError?.(error)
    }
  })
}
