import { useServices } from 'hooks/useServices'
import { useAuth } from 'hooks/auth/useAuth'
import { useMutation } from 'react-query'
import { getIdFromObj } from 'helpers/strings'
import { DataroomFile } from 'types/dataroomFile'
import { documentsURL } from 'config/apiURL'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { useIsAdmin } from 'helpers/acl'

export const useDeleteFile = (
  fileId: string,
  callbacks?: QueryOrMutationCallbacks<DataroomFile>
) => {
  const { snackbarService, apiService } = useServices()
  const { user } = useAuth()
  const isAdmin = useIsAdmin()
  const url = documentsURL.deleteById(
    isAdmin ? undefined : getIdFromObj(user),
    fileId
  )
  const deleteFile = async () => {
    return await apiService.delete<DataroomFile>(url, {})
  }

  return useMutation(deleteFile, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
    },
    onError: error => {
      snackbarService.showSnackbar('Error', 'error')
      callbacks?.onError?.(error)
    }
  })
}
