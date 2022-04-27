import { Grid, Box } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { FinancialSummary } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary'
import React from 'react'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
export const TradingContainer = () => {
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <Grid item>
        <PageHeader title={'OTC Trading Market'} showBreadcrumbs={false} />
      </Grid>

      <Grid item xs={12} className={classes.colorGrid}>
        <FinancialSummary />
      </Grid>
    </Box>
  )
}
