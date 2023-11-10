import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { ledgerQueryKeys } from 'config/queryKeys'
import { ledgerURL } from 'config/apiURL'
import { download } from 'ui/ExportButton/ExportButton'
import { isValidJSON } from 'helpers/strings'

type ExportTokenTransactionProps = (
  pageNo?: number,
  pageSize?: number,
  startDate?: string | boolean,
  endDate?: string | boolean,
  search?: string | boolean,
  source?: string | boolean
) => any

export const useExportTokenTransactions: ExportTokenTransactionProps = (
  pageNo = 0,
  pageSize = 500,
  startDate = undefined,
  endDate = undefined,
  search = undefined,
  source = undefined
) => {
  const { apiService, snackbarService } = useServices()
  const uri = ledgerURL.exportTokenTransactions
  const postData = {
    skip: pageNo,
    limit: pageSize,
    from: startDate,
    to: endDate,
    search,
    source
  }

  const exportTransactions = async () =>
    await apiService.post(uri, postData, {
      transformResponse: [
        data => {
          const isJSON = isValidJSON(data)
          if (!isJSON) download(data, 'Token Transactions')
          return isJSON ? JSON.parse(data) : data
        }
      ]
    })

  const { data, ...rest } = useQuery(
    ledgerQueryKeys.exportTokenTransactions,
    exportTransactions,
    {
      enabled: false,
      retry: false,
      onError: (error: any) => {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  )

  return {
    ...rest,
    data
  }
}
