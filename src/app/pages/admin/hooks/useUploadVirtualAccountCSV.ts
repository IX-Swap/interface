import { virtualAccounts } from 'config/apiURL'
import { virtualAccountQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useMutation, useQueryCache } from 'react-query'

export const useUploadVirtualAccountCSV = () => {
  const { apiService, snackbarService } = useServices()
  const queryCache = useQueryCache()

  const uploadCSV = async (documents: FileList | null) => {
    const formData = new FormData()
    formData.append('documents', documents?.[0] ?? '')
    return await apiService.post(virtualAccounts.uploadCSV, formData)
  }

  return useMutation(uploadCSV, {
    onSuccess: () => {
      void snackbarService.showSnackbar(
        'New virtual accounts added successfully.',
        'success'
      )
      void queryCache.invalidateQueries(virtualAccountQueryKeys.listUnassigned)
    },
    onError: (error: any) => {
      snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
