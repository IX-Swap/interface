import { issuanceURL } from 'config/apiURL'
import { useServices } from 'hooks/useServices'
import { useMutation } from 'react-query'
import { history } from 'config/history'
import { IssuanceRoute } from 'app/pages/issuance/router/config'

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
      history.push(IssuanceRoute.financialReports)
    },
    onError: (error: any) => {
      void snackbarService.showSnackbar(error.message, 'error')
    }
  })
}
