import { IssuanceDataStatistics } from 'state/issuance/types'
import { formatCurrency } from 'utils/money'
import { JoinedCell, OverflowRaw, OverflowRow, SpreadColumn } from './styled'
import React from 'react'
import { useFieldsByRole } from './helpers'

export interface StatisticsProps {
  statistics: IssuanceDataStatistics
  count: number
}

export const Statistics = ({ statistics, count }: StatisticsProps) => {
  const { isAdmin } = useFieldsByRole()
  if (!statistics) return null

  return (
    <OverflowRow key="statistics" count={count}>
      <SpreadColumn>
        <span>Total</span>
        <JoinedCell>{statistics.nameCount}</JoinedCell>
      </SpreadColumn>
      <OverflowRaw>{statistics.companyNameCount}</OverflowRaw>
      <OverflowRaw>{formatCurrency(statistics.totalInvestmentAmount ?? 0, '$')}</OverflowRaw>
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
      <OverflowRaw>-</OverflowRaw>
      <OverflowRaw>-</OverflowRaw>
    </OverflowRow>
  )
}
