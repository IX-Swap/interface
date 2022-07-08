import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { BlobWithExtension } from 'services/api/types'
import {
  QueryOrMutationCallbacks,
  QueryOrMutationSimpleCallbacks
} from './types'
import { getBlobFromResponse } from './utils'

export const useDownloadRawFile = (
  uri: string,
  callbacks?: QueryOrMutationSimpleCallbacks<BlobWithExtension>
) => {
  const { snackbarService, apiService } = useServices()
  const downloadFile = async () => {
    return await apiService.get(uri)
  }

  return useMutation(downloadFile, {
    onSuccess: data => {
      const response = getBlobFromResponse(data)
      callbacks?.onSuccess?.(response)
    },
    onError: (error: any) => {
      callbacks?.onError?.(error)
      void snackbarService.showSnackbar(error.toString(), 'error')
    }
  })
}

export const useOldDownloadRawFile = (
  uri: string,
  callbacks?: QueryOrMutationCallbacks<Blob>
) => {
  const { snackbarService, apiService } = useServices()
  const downloadFile = async () => {
    return await apiService.get<Blob>(uri, { responseType: 'blob' })
  }

  return useMutation(downloadFile, {
    onSuccess: data => {
      callbacks?.onSuccess?.(data)
    },
    onError: (error: any) => {
      callbacks?.onError?.(error)
      void snackbarService.showSnackbar(error.toString(), 'error')
    }
  })
}
