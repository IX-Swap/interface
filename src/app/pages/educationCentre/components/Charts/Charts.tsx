import { Box, Grid, Typography } from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { NoData } from 'app/components/NoData/NoData'
import { SecuritiesBarChart } from 'app/pages/educationCentre/components/Charts/SecuritiesBarChart'
import { CategoryFilter } from 'app/pages/educationCentre/components/Securities/CategoryFilter'
import { Security } from 'app/pages/educationCentre/components/Securities/SecurityCard'
import { getTotalCapitalization } from 'app/pages/educationCentre/utils'
import { formatMoney } from 'helpers/numbers'
import React from 'react'

export interface ChartsProps {
  data?: Security[]
  isLoading: boolean
}

export const Charts = ({ data, isLoading }: ChartsProps) => {
  if (isLoading) {
    return (
      <Box width='100%' height='100%' position='relative' paddingTop={24}>
        <LoadingIndicator />
      </Box>
    )
  }

  if (data === undefined) {
    return null
  }

  if (data.length < 1) {
    return <NoData title='No data found' />
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Typography variant='body1'>
          Total Capitalization:{' '}
          <Box component={'span'} fontWeight={600}>
            {formatMoney(getTotalCapitalization(data), '$')}
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent='center' alignItems='center' spacing={1}>
          <Grid item>
            <Typography variant='body1'>
              <Box component={'span'} fontWeight={600}>
                Percentage of Securities vs
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            <CategoryFilter />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <SecuritiesBarChart data={data} />
      </Grid>
    </Grid>
  )
}
