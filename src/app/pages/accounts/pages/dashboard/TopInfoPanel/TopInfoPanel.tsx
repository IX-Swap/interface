import React from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import { useStyles } from './TopInfoPanel.styles'
import { AvailableCash } from 'app/pages/accounts/pages/dashboard/AvailableCash/AvailableCash'
import { Investments } from 'app/pages/accounts/pages/dashboard/Investments/Investments'
import { TotalAssetBalance } from 'app/pages/accounts/pages/dashboard/TotalAssetBalance/TotalAssetBalance'
import { WithdrawalAddresses } from 'app/pages/accounts/pages/dashboard/WithdrawalAddresses/WithdrawalAddresses'

export const TopInfoPanel: React.FC = () => {
  const classes = useStyles()
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
          <AvailableCash />

          <Grid item className={classes.line} />

          <Investments />

          <Grid item className={classes.line} />

          <TotalAssetBalance />

          <Grid item className={classes.line} />

          <WithdrawalAddresses />
        </Grid>
      </CardContent>
    </Card>
  )
}
