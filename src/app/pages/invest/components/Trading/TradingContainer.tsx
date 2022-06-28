import { Box, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WideContainer } from 'app/components/WideContainer/WideContainer'
import { ShortFinancialSummary } from 'app/pages/invest/components/FinancialSummary/ShortFinancialSummary'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
import { WalletModalContextWrapper } from 'components/WalletModal/WalletModalContextWrapper'
import React from 'react'
import { TradingBody } from './TradingBody'

export const TradingContainer = () => {
  const classes = useStyles()
  return (
    <WalletModalContextWrapper>
      <WideContainer>
        <Grid item>
          <PageHeader
            title={'OTC Trading Market'}
            styled={false}
            showBreadcrumbs={false}
          />
        </Grid>
        <Box>
          <Box className={classes.contentWrapper}>
            <Grid item xs={12} className={classes.colorGrid}>
              <ShortFinancialSummary />
            </Grid>
            <Grid item xs={12}>
              <TradingBody />
            </Grid>
          </Box>
        </Box>
      </WideContainer>
    </WalletModalContextWrapper>
  )
}
