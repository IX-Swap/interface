import { Box, Grid, Typography } from '@mui/material'
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
        <Grid item xs={12}>
          <Typography variant='h2' sx={{ mb: 3 }}>
            OTC Trading Market
          </Typography>
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
