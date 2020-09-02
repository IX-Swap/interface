import React from 'react'
import { Grid } from '@material-ui/core'
import { DSDepositInput } from 'v2/app/pages/accounts/pages/digital-securities/DSDeposit/Setup'
import { BalancesList } from 'v2/app/pages/accounts/pages/digital-securities/DSDeposit/BalancesList'
import { AssetView } from 'v2/app/pages/accounts/pages/digital-securities/DSDeposit/AssetView'

export const DepositView: React.FC = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <DSDepositInput />
        <BalancesList />
      </Grid>
      <Grid item xs={12} sm={6}>
        <AssetView />
      </Grid>
    </Grid>
  )
}
