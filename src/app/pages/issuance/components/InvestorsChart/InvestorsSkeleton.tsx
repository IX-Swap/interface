import { Skeleton } from '@material-ui/lab'
import { Grid } from '@material-ui/core'
import React from 'react'
import { InsightCard } from '../InsightCard'
import { ChartWrapper } from '../IssuanceLanding/ChartWrapper'
import { VSpacer } from 'components/VSpacer'

export const InvestorsSkeleton = () => {
  return (
    <InsightCard>
      <ChartWrapper title={<Skeleton width={130} />}>
        <Grid xs={12}>
          <VSpacer size={'medium'} />
          <Skeleton width={'100%'} height={30} />
        </Grid>{' '}
        <Grid xs={12}>
          <Skeleton width={'100%'} height={30} />
        </Grid>{' '}
        <Grid xs={12}>
          <Skeleton width={'100%'} height={30} />
        </Grid>{' '}
        <Grid xs={12}>
          <Skeleton width={'100%'} height={30} />
        </Grid>
      </ChartWrapper>
    </InsightCard>
  )
}
