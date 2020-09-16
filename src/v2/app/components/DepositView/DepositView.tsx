import React from 'react'
import { Grid, Typography, Box, Paper } from '@material-ui/core'
import { useStyles } from './styles'
import { INVESTAX_BANK } from 'v2/config'
import { CashDeposit } from 'v2/types/cashdeposit'
import { BankDetails } from 'v2/app/components/BankDetails'
import { formatMoney } from 'v2/helpers/numbers'

const BoldTypography = ({ children, ...others }: any) => (
  // eslint-disable-next-line
  <Typography {...others}>
    <b>{children}</b>
  </Typography>
)

export interface DepositView {
  deposit: CashDeposit
}

export const DepositView = ({ deposit }: DepositView) => {
  const classes = useStyles()
  const bankAccount = { ...INVESTAX_BANK }

  return (
    <Grid container justify='center' direction='column' component={Paper}>
      <Box p={4} />
      <Grid container className={classes.infoGrid}>
        <Grid item xs={6}>
          <BoldTypography variant='subtitle2' className={classes.labels}>
            Status:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant='subtitle2'
            className={classes.values}
            color='primary'
          >
            {deposit.status}
          </BoldTypography>
        </Grid>

        <Grid item xs={6}>
          <BoldTypography variant='subtitle2' className={classes.labels}>
            Deposit Code:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant='subtitle2'
            className={classes.values}
            color='primary'
          >
            {deposit.depositCode}
          </BoldTypography>
        </Grid>

        <Grid item xs={6}>
          <BoldTypography variant='subtitle2' className={classes.labels}>
            Deposit Amount:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant='subtitle2'
            className={classes.values}
            color='primary'
          >
            {formatMoney(deposit.amount, deposit.asset.symbol)}
          </BoldTypography>
        </Grid>
      </Grid>
      <Box m={4}>
        <BankDetails bank={bankAccount} />
      </Box>
    </Grid>
  )
}
