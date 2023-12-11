import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { securityToken as stoQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'
import { download } from 'ui/ExportButton/ExportButton'
import { isValidJSON } from 'helpers/strings'

type ExportDepositProps = (
  pageNo?: number,
  pageSize?: number,
  startDate?: string | boolean,
  endDate?: string | boolean,
  search?: string | boolean,
  status?: string | boolean
) => any

export const useExportDeposits: ExportDepositProps = (
  pageNo = 0,
  pageSize = 500,
  startDate = undefined,
  endDate = undefined,
  search = undefined,
  status = undefined
) => {
  const { apiService, snackbarService } = useServices()
  const uri = accountsURL.securityToken.exportDeposits
  const postData = {
    skip: pageNo,
    limit: pageSize,
    from: startDate,
    to: endDate,
    search,
    status
  }

  const exportDeposits = async () =>
    await apiService.post(uri, postData, {
      transformResponse: [
        data => {
          const isJSON = isValidJSON(data)
          if (!isJSON) download(data, 'My Token Deposits')
          return isJSON ? JSON.parse(data) : data
        }
      ]
    })

  const { data, ...rest } = useQuery(
    stoQueryKeys.exportDeposits,
    exportDeposits,
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
