import { issuanceURL } from 'config/apiURL'
import { issuanceQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export const useReportTemplate = () => {
  const { apiService } = useServices()

  const getTemplate = async () => {
    return await apiService.get(issuanceURL.financialReports.reportTemplate)
  }

  const { data, ...rest } = useQuery(
    issuanceQueryKeys.reportTemplate,
    getTemplate
  )

  return {
    templateUrl: data?.data,
    ...rest
  }
}
