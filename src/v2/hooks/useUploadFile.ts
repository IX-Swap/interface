import { useMutation } from 'react-query'
import { useServices } from 'v2/hooks/useServices'
import { DataroomFile } from 'v2/types/dataroomFile'
import { QueryOrMutationCallbacks } from 'v2/hooks/types'

export interface UploadDocumentInfo {
  title?: string
  type?: string
  feature?: string
  resourceId?: string
}

export interface UploadDocumentArgs extends UploadDocumentInfo {
  documents: File | File[]
}

export const defaultUploadDocumentInfo: UploadDocumentInfo = {
  title: '',
  type: ''
}

export const useUploadFile = <R = DataroomFile[]>(
  callbacks?: QueryOrMutationCallbacks<R>
) => {
  const { snackbarService, apiService } = useServices()
  const uploadFile = async (args: UploadDocumentArgs) => {
    const formData = new FormData()

    Object.entries(args).forEach(([key, value]) => {
      if (typeof value === 'string') {
        formData.append(key, value)
      } else {
        Array.isArray(value)
          ? value.forEach(v => formData.append(key, v))
          : formData.append(key, value)
      }
    })

    return await apiService.post<R>('/dataroom', formData)
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
