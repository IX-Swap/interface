import React from 'react'
import { Grid, Typography, Box, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { INVESTAX_BANK } from '../../../config'
import { CashDeposit } from '../../../types/cashdeposit'
import BankDetails from '../bank-details'
import { formatMoney } from '../../../helpers/numbers'

const useStyles = makeStyles(() => ({
  infoGrid: {
    width: '300px',
    alignSelf: 'center',
    textAlign: 'center',
    padding: '10px'
  },
  labels: {
    textAlign: 'left'
  },
  values: {
    textAlign: 'right'
  }
}))

const BoldTypography = ({ children, ...others }: any) => (
  // eslint-disable-next-line
  <Typography {...others}>
    <b>{children}</b>
  </Typography>
)

function DepositView ({ deposit }: { deposit: CashDeposit }) {
  const classes = useStyles()

  if (!deposit) {
    return <span>nothing to display</span>
  }

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

export default DepositView
