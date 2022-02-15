import { issuanceURL } from 'config/apiURL'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useReport = (reportId?: string) => {
  const { apiService } = useServices()

  const getReport = async () => {
    const url = issuanceURL.financialReports.getReport(reportId)
    return await apiService.get(url)
  }

  const { data, ...rest } = useQuery(
    issuanceQueryKeys.getReport(reportId),
    getReport,
    {
      enabled: reportId !== undefined && reportId !== ''
    }
  )

  return {
    data: data?.data,
    ...rest
  }
}
