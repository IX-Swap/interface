import React from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import { useStyles } from 'app/pages/accounts/pages/dashboard/components/TopInfoPanel/TopInfoPanel.styles'
import { AvailableCash } from 'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash'
import { Investments } from 'app/pages/accounts/pages/dashboard/components/Investments/Investments'
import { TotalAssetBalance } from 'app/pages/accounts/pages/dashboard/components/TotalAssetBalance/TotalAssetBalance'
import { WithdrawalAddresses } from 'app/pages/accounts/pages/dashboard/components/WithdrawalAddresses/WithdrawalAddresses'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useGetBalances } from 'app/pages/accounts/hooks/useGetBalances'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const TopInfoPanel: React.FC = () => {
  const classes = useStyles()
  const { list } = useVirtualAccount()
  const { data: USDBalances } = useGetBalances(list?.[0]._id)
  const { data: SGDBalances } = useGetBalances(list?.[1]._id)

  if (USDBalances === undefined || SGDBalances === undefined) {
    return <LoadingIndicator />
  }

  const USDCash = USDBalances.availableBalance
  const {
    availableBalance,
    primaryInvestmentBalance,
    secondaryInvestmentBalance,
    totalAssetBalance,
    withdrawalAddressCount
  } = SGDBalances

  return (
    <Card elevation={0} className={classes.container}>
      <CardContent className={classes.cardContent}>
        <Grid
          container
          wrap={'nowrap'}
          justify={'space-between'}
          alignContent={'flex-start'}
          className={classes.wrapper}
        >
          <AvailableCash usd={USDCash} sgd={availableBalance} />

          <Grid item className={classes.line} />

          <Investments
            primary={primaryInvestmentBalance}
            secondary={secondaryInvestmentBalance}
          />

          <Grid item className={classes.line} />

          <TotalAssetBalance value={totalAssetBalance} />

          <Grid item className={classes.line} />

          <WithdrawalAddresses number={withdrawalAddressCount} />
        </Grid>
      </CardContent>
    </Card>
  )
}
