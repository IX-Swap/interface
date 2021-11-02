import React from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import { useStyles } from 'app/pages/accounts/pages/dashboard/components/TopInfoPanel/TopInfoPanel.styles'
import { AvailableCash } from 'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash'
import { Investments } from 'app/pages/accounts/pages/dashboard/components/Investments/Investments'
import { TotalAssetBalance } from 'app/pages/accounts/pages/dashboard/components/TotalAssetBalance/TotalAssetBalance'
import { BlockchainWallets } from 'app/pages/accounts/pages/dashboard/components/BlockchainWallets/BlockchainWallets'
import { VirtualAccountInfo, BalancesInfo } from 'types/portfolio'

export interface TopInfoPanelProps {
  accounts: VirtualAccountInfo[] | undefined
  balances: BalancesInfo | undefined
}

export const TopInfoPanel = ({ accounts, balances }: TopInfoPanelProps) => {
  const classes = useStyles()

  if (accounts === undefined || balances === undefined) {
    return null
  }

  return (
    <Card elevation={0} className={classes.container}>
      <CardContent className={classes.cardContent}>
        <Grid
          container
          wrap={'nowrap'}
          justify={'space-around'}
          alignContent={'flex-start'}
          className={classes.wrapper}
        >
          <AvailableCash accounts={accounts} />

          <Grid item className={classes.line} />

          <Investments primary={balances.primaryInvestmentBalance} />

          <Grid item className={classes.line} />

          <TotalAssetBalance value={balances.totalAssetBalance} />

          <Grid item className={classes.line} />

          <BlockchainWallets count={balances.withdrawalAddressCount} />
        </Grid>
      </CardContent>
    </Card>
  )
}
