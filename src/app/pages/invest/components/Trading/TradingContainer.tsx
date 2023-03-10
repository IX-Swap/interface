import { Box, Grid } from '@mui/material'
import { ShortFinancialSummary } from 'app/pages/invest/components/FinancialSummary/ShortFinancialSummary'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
import { WalletModalContextWrapper } from 'components/WalletModal/WalletModalContextWrapper'
import React from 'react'
import { TradingBody } from './TradingBody'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const TradingContainer = () => {
  const classes = useStyles()

  return (
    <WalletModalContextWrapper>
      <Grid
        item
        xs={12}
        container
        direction='column'
        style={{ display: 'table' }}
      >
        <Grid item>
          <PageHeader title='OTC Trading Market' />
        </Grid>
        <Box sx={{ m: 2 }}>
          <Grid item xs={12} className={classes.colorGrid} mb={2}>
            <ShortFinancialSummary />
          </Grid>
          <Grid item xs={12}>
            <TradingBody />
          </Grid>
        </Box>
      </Grid>
    </WalletModalContextWrapper>
  )
}
