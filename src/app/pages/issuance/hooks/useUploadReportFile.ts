import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'

interface ReportFile {
  nav: number
  dateFrom: string
  dateTo: string
  reportDocuments: string[]
  dso?: string
}

export const useUploadReportFile = () => {
  const { apiService, snackbarService } = useServices()

  const uploadFile = async (args: ReportFile) => {
    const url = issuanceURL.financialReports.uploadFile
    return await apiService.post(url, args)
  }

  return useMutation(uploadFile, {
    onSuccess: () => {
      void snackbarService.showSnackbar('Success', 'success')
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
