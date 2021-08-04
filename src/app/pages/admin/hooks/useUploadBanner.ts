import { useMutation } from 'react-query'
import { useServices } from 'hooks/useServices'
import { DataroomFile } from 'types/dataroomFile'
import { QueryOrMutationCallbacks } from 'hooks/types'
import { bannerURL } from 'config/apiURL'

export interface UploadDocumentInfo {
  title?: string
  type?: string
  feature?: string
  resourceId?: string
}

export interface UploadDocumentArgs extends UploadDocumentInfo {
  banner: File | File[]
}

export const useUploadBanner = (
  callbacks?: QueryOrMutationCallbacks<DataroomFile[]>,
  uri = bannerURL.uploadBanner
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

    return await apiService.post<DataroomFile[]>(uri, formData)
  }

  return useMutation(uploadFile, {
    onSuccess: data => {
      const message = `Banner saved successfully.`

      void snackbarService.showSnackbar(message, 'success')
      callbacks?.onSuccess?.(data)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
      callbacks?.onError?.(error)
    }
  })
}
