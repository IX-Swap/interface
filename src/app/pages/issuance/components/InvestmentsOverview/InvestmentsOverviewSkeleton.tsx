import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { InsightCard } from '../InsightCard'
import { ChartWrapper } from '../IssuanceLanding/ChartWrapper'

export const InvestmentsOverviewSkeleton = () => {
  return (
    <InsightCard>
      <ChartWrapper title={<Skeleton width={220} />}>
        <Skeleton
          variant='rect'
          height={26}
          style={{ marginBottom: 10, marginTop: 21 }}
        />
        <Skeleton variant='rect' height={26} style={{ marginBottom: 10 }} />
        <Skeleton variant='rect' height={26} style={{ marginBottom: 10 }} />
        <Skeleton variant='rect' height={26} style={{ marginBottom: 10 }} />
        <Skeleton variant='rect' height={26} style={{ marginBottom: 10 }} />
      </ChartWrapper>
    </InsightCard>
  )
}
