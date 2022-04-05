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
  userId?: string,
  setCompleted?: (completed: number) => void
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
      formData,
      {
        onUploadProgress: function (progressEvent) {
          var percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setCompleted?.(percentCompleted)
        }
      }
    )
  }

  return useMutation(uploadFile, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
    },
    onError: (error: any) => {
      callbacks?.onError?.(error)
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
