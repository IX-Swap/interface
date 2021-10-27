import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { DataroomFile } from 'types/dataroomFile'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { documentsURL } from 'config/apiURL'

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

export const useUploadFile = (
  callbacks?: QueryOrMutationCallbacks<DataroomFile[]>,
  uri = documentsURL.create,
  userId?: string
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

    return await apiService.post<DataroomFile[]>(
      [uri, userId].join('/'),
      formData
    )
  }

  return useMutation(uploadFile, {
    onSuccess: data => {
      const message = `Successfully uploaded ${data.data.length} files`

      void snackbarService.showSnackbar(message, 'success')
      callbacks?.onSuccess?.(data)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}
