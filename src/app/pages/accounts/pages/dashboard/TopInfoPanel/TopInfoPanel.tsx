import React from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import { useStyles } from './TopInfoPanel.styles'
import { AvailableCash } from 'app/pages/accounts/pages/dashboard/AvailableCash/AvailableCash'
import { Investments } from 'app/pages/accounts/pages/dashboard/Investments/Investments'
import { TotalAssetBalance } from 'app/pages/accounts/pages/dashboard/TotalAssetBalance/TotalAssetBalance'
import { WithdrawalAddresses } from 'app/pages/accounts/pages/dashboard/WithdrawalAddresses/WithdrawalAddresses'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import { useGetBalances } from 'app/pages/accounts/hooks/useGetBalances'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const TopInfoPanel: React.FC = () => {
  const classes = useStyles()
  const { list } = useVirtualAccount()
  const { data: USDBalances } = useGetBalances(list?.[0]._id)
  const { data: SGDBalances } = useGetBalances(list?.[1]._id)
  const USDCash = USDBalances?.availableBalance
  const SGDCash = SGDBalances?.availableBalance

  console.log('SGDBalances', SGDBalances)

  if (USDBalances === undefined || SGDBalances === undefined) {
    return <LoadingIndicator />
  }

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
          <AvailableCash USDCash={USDCash} SGDCash={SGDCash} />

          <Grid item className={classes.line} />

          <Investments
            primary={SGDBalances.primaryInvestmentBalance}
            secondary={SGDBalances.secondaryInvestmentBalance}
          />

          <Grid item className={classes.line} />

          <TotalAssetBalance value={SGDBalances.totalAssetBalance} />

          <Grid item className={classes.line} />

          <WithdrawalAddresses />
        </Grid>
      </CardContent>
    </Card>
  )
}
