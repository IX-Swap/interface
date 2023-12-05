import { IssuanceDataStatistics } from 'state/issuance/types'
import { formatCurrency } from 'utils/money'
import { JoinedCell, OverflowRaw, OverflowRow, SpreadColumn } from './styled'
import React from 'react'
import { useRole } from 'state/user/hooks'
import { IssuanceReportTab } from './types'

export interface StatisticsProps {
  statistics: IssuanceDataStatistics
  count: number,
  tab: IssuanceReportTab,
}

export const Statistics = ({ statistics, count, tab }: StatisticsProps) => {
  const { isAdmin } = useRole()
  if (!statistics) return null

  const totalInvestmentAmount = tab === IssuanceReportTab.INVESTMENTS ? statistics.totalInvestmentAmount : 0
  const totalWishAmount = tab === IssuanceReportTab.REGISTRATIONS ? statistics.totalInvestmentAmount : '-'

  return (
    <OverflowRow key="statistics" count={count}>
      <SpreadColumn>
        <span>Total</span>
        <JoinedCell>{statistics.nameCount}</JoinedCell>
      </SpreadColumn>
      <OverflowRaw>{statistics.companyNameCount}</OverflowRaw>
      <OverflowRaw>{totalInvestmentAmount ?? 0}</OverflowRaw>
      <OverflowRaw>{statistics.totalTokenAmount}</OverflowRaw>
      <OverflowRaw>-</OverflowRaw>
      <OverflowRaw>-</OverflowRaw>
      <OverflowRaw>{statistics.nationalityCount}</OverflowRaw>
      <OverflowRaw>{statistics.countryCount}</OverflowRaw>
      <OverflowRaw>{statistics.accreditedCount}</OverflowRaw>
      <OverflowRaw>-</OverflowRaw>
      {isAdmin && (
        <>
          <OverflowRaw>-</OverflowRaw>
          <OverflowRaw>-</OverflowRaw>
          <OverflowRaw>-</OverflowRaw>
        </>
      )}
      <OverflowRaw>{totalWishAmount}</OverflowRaw>
    </OverflowRow>
  )
}
