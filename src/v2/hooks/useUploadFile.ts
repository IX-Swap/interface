import { useMutation } from 'react-query'
import { useServices } from 'v2/services/useServices'
import { Document } from 'v2/types/document'

export interface UploadFileArgs {
  title: string
  type: string
  file: File
}

export const useUploadFile = (cb: (d: Document[]) => any) => {
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
      cb(data.data)
    },
    onError: () => {
      void snackbarService.showSnackbar('Failed to upload the file', 'error')
    }
  })
}
