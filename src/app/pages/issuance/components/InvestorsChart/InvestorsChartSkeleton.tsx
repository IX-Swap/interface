import { Skeleton } from '@mui/material';
import { Grid } from '@mui/material'
import React from 'react'
import { InsightCard } from '../InsightCard'
import { ChartWrapper } from '../IssuanceLanding/ChartWrapper'
import { VSpacer } from 'components/VSpacer'

export const InvestorsChartSkeleton = () => {
  return (
    <InsightCard>
      <ChartWrapper title={<Skeleton width={130} height={25} />}>
        <Grid container>
          <Grid item xs={12}>
            <VSpacer size={'medium'} />
            <Skeleton variant="rectangular" width={'100%'} height={336} />
            <VSpacer size={'small'} />
          </Grid>
          <Grid container spacing={2}>
            {[0, 1, 2].map(item => (
              <Grid key={item} item xs={1}>
                <Skeleton variant="rectangular" width={'100%'} height={25} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </ChartWrapper>
    </InsightCard>
  );
}
