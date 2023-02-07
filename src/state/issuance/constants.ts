import { getDefaultPaginatedResponse } from 'types/pagination'
import { IssuanceDataExtract, IssuanceDataStatisticsDto } from './types'

export const emptyIssuanceDataStatistics: IssuanceDataStatisticsDto = {
  result: {
    ...getDefaultPaginatedResponse<IssuanceDataExtract>(),
  },
  statistics: {
    totalInvestmentAmount: '0',
    nameCount: 0,
    companyNameCount: 0,
    totalTokenAmount: '0',
    nationalityCount: '0',
    countryCount: '0',
    accreditedCount: '0',
  },
}
