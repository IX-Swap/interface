import { Box, Grid } from '@mui/material'
import { ShortFinancialSummary } from 'app/pages/invest/components/FinancialSummary/ShortFinancialSummary'
import { useStyles } from 'app/pages/invest/components/Trading/TradingContainer.styles'
import { WalletModalContextWrapper } from 'components/WalletModal/WalletModalContextWrapper'
import React from 'react'
import { TradingBody } from './TradingBody'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const TradingContainer = () => {
  const classes = useStyles()

  return (
    <WalletModalContextWrapper>
      <Grid container direction='column' style={{ display: 'table' }}>
        <Grid item>
          <PageHeader title='OTC Trading Market' />
        </Grid>
        <RootContainer>
          <Box className={classes.contentWrapper}>
            <Grid item xs={12}>
              <ShortFinancialSummary />
            </Grid>
            <Grid item xs={12}>
              <TradingBody />
            </Grid>
          </Box>
        </RootContainer>
      </Grid>
    </WalletModalContextWrapper>
  )
}
