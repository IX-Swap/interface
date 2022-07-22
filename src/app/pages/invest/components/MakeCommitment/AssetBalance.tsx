import React from 'react'
import { formatMoney } from 'helpers/numbers'
import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'
import { Grid } from '@mui/material'
import { NoBalance } from 'app/pages/invest/components/MakeCommitment/NoBalance'
import { useCurrencyBalance } from 'app/pages/invest/hooks/useCurrencyBalance'

export interface AssetBalanceProps {
  symbol: string
}

export const AssetBalance = ({ symbol }: AssetBalanceProps) => {
  const currencyBalance: number = useCurrencyBalance(symbol)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OverviewValue
          label='Available Balance'
          value={formatMoney(currencyBalance, symbol)}
        />
      </Grid>
      {currencyBalance <= 0 && (
        <Grid item xs={12}>
          <NoBalance />
        </Grid>
      )}
    </Grid>
  )
}
