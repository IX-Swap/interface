import { Box, Grid, Typography } from '@material-ui/core'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'
import { LabelledValue } from 'components/LabelledValue'
import React from 'react'

export const TradingPairs = () => {
  return (
    <Box>
      <Typography>Singapore Dollar (SGD)</Typography>
      <Box pb={1} />
      <Typography>United States Dollar (USD)</Typography>
    </Box>
  )
}

export const MarketOverview = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormSectionHeader title='Market' />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <LabelledValue
          label='Available Trading Pairs'
          value={<TradingPairs />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <LabelledValue label='Available Market' value='OTC' />
      </Grid>
    </Grid>
  )
}
