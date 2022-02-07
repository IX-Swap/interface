import React from 'react'
import { Skeleton } from '@mui/material'
import { InsightCard } from '../InsightCard'
import { ChartWrapper } from '../IssuanceLanding/ChartWrapper'

export const InvestmentsOverviewSkeleton = () => {
  return (
    <InsightCard>
      <ChartWrapper title={<Skeleton width={220} />}>
        <Skeleton
          variant='rectangular'
          height={26}
          style={{ marginBottom: 10, marginTop: 21 }}
        />
        <Skeleton
          variant='rectangular'
          height={26}
          style={{ marginBottom: 10 }}
        />
        <Skeleton
          variant='rectangular'
          height={26}
          style={{ marginBottom: 10 }}
        />
        <Skeleton
          variant='rectangular'
          height={26}
          style={{ marginBottom: 10 }}
        />
        <Skeleton
          variant='rectangular'
          height={26}
          style={{ marginBottom: 10 }}
        />
      </ChartWrapper>
    </InsightCard>
  )
}
