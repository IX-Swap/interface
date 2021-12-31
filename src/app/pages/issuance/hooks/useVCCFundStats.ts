import { issuanceURL } from 'config/apiURL'
import { dsoQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAllCorporates } from 'app/pages/identity/hooks/useAllCorporates'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { InvestmentStats, SubFundStats } from 'types/vccDashboard'
import { subMonths } from 'date-fns'

export const useVCCFundStats = () => {
  const { user } = useAuth()
  const { apiService } = useServices()
  const userId = getIdFromObj(user)
  const { data: corporateIdentities, isLoading: corporateIdentitiesIsLoading } =
    useAllCorporates({
      status: 'Approved',
      userId
    })
  const corporateId = getIdFromObj(corporateIdentities.list[0])
  const { getFilterValue } = useQueryFilter()
  const status = getFilterValue('status')
  const subFunds = getFilterValue('subfunds')

  const filters = {
    fundStatus: status,
    dsos: subFunds?.split(','),
    corporateId
  }
  const queryKeyParams: [string, string, string] = [
    corporateId,
    status ?? '',
    subFunds ?? ''
  ]
  const queryOptions = {
    enabled:
      !corporateIdentitiesIsLoading &&
      corporateId !== undefined &&
      subFunds &&
      subFunds.length > 0
  }

  const getSubFundInvestmentStats = async () => {
    const uri = issuanceURL.vcc.getInvestmentStats
    const now = Date.now()

    return await apiService.post<InvestmentStats[]>(uri, {
      ...filters,
      start: subMonths(now, 12),
      end: new Date(now)
    })
  }

  const getSubFundStats = async () => {
    const uri = issuanceURL.vcc.getSubFundStats
    return await apiService.post<SubFundStats[]>(uri, filters)
  }

  const subFundStatsQuery = useQuery(
    dsoQueryKeys.vccSubFundStats(...queryKeyParams),
    getSubFundStats,
    queryOptions
  )

  const subFundInvestmentStatsQuery = useQuery(
    dsoQueryKeys.vccSubFundInvestmentStats(...queryKeyParams),
    getSubFundInvestmentStats,
    queryOptions
  )

  return {
    subFundStats: {
      ...subFundStatsQuery,
      isLoading: corporateIdentitiesIsLoading || subFundStatsQuery.isLoading,
      data: subFundStatsQuery.data?.data?.[0]
    },
    subFundInvestmentStats: {
      ...subFundInvestmentStatsQuery,
      isLoading:
        corporateIdentitiesIsLoading || subFundInvestmentStatsQuery.isLoading,
      data: subFundInvestmentStatsQuery.data?.data?.[0]
    }
  }
}
