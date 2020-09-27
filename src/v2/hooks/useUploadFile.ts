import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { Document } from 'v2/types/document'
import { QueryOrMutationCallbacks } from 'v2/hooks/types'

export interface UploadFileArgs {
  title: string
  type: string
  file: File
}

export const useUploadFile = (
  callbacks?: QueryOrMutationCallbacks<Document[]>
) => {
  const { snackbarService, apiService } = useServices()
  const uploadFile = async (args: UploadFileArgs) => {
    const { title, file, type } = args
    const formData = new FormData()

    formData.append('title', title)
    formData.append('documents', file)
    formData.append('type', type)

    return await apiService.post<Document[]>('/dataroom', formData)
  }

  return useMutation(uploadFile, {
    onSuccess: data => {
      void snackbarService.showSnackbar('File uploaded', 'success')
      callbacks?.onSuccess?.(data)
    },
    onError: error => {
      void snackbarService.showSnackbar('Failed to upload the file', 'error')
      callbacks?.onError?.(error)
    }
  })
}
