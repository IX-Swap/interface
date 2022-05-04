import { Box, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { ShortFinancialSummary } from 'app/pages/exchange/components/FinancialSummary/ShortFinancialSummary'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
import React from 'react'
export const TradingContainer = () => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <Grid item>
          <PageHeader title={'OTC Trading Market'} showBreadcrumbs={false} />
        </Grid>

        <Grid item xs={12} className={classes.colorGrid}>
          <ShortFinancialSummary />
        </Grid>
      </Box>
    </Box>
  )
}
