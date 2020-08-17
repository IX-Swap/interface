import React from 'react'
import { Paper, Grid, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { formatMoney } from '../../../helpers/numbers'
import BankDetails from '../bank-details'
import { CashWithdrawal } from '../../../types/cash-withdrawal'

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

function WithdrawalView({ withdrawal }: { withdrawal: CashWithdrawal }) {
  const classes = useStyles()

  if (!withdrawal) return <span>nothing to display</span>

  return (
    <Grid container justify='center' direction='column' component={Paper}>
      <Box p={4} />
      <Grid container className={classes.infoGrid}>
        {withdrawal.individual && (
          <>
            <Grid item xs={6}>
              <BoldTypography variant='subtitle2' className={classes.labels}>
                By:
              </BoldTypography>
            </Grid>
            <Grid item xs={6}>
              <BoldTypography
                variant='subtitle2'
                className={classes.values}
                color='primary'
              >
                {withdrawal.individual.firstName}{' '}
                {withdrawal.individual.lastName}
              </BoldTypography>
            </Grid>
          </>
        )}

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
            {withdrawal.status}
          </BoldTypography>
        </Grid>

        <Grid item xs={6}>
          <BoldTypography variant='subtitle2' className={classes.labels}>
            Account No:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant='subtitle2'
            className={classes.values}
            color='primary'
          >
            {withdrawal.bankAccount.bankAccountNumber}
          </BoldTypography>
        </Grid>

        <Grid item xs={6}>
          <BoldTypography variant='subtitle2' className={classes.labels}>
            Withdrawal Amount:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant='subtitle2'
            className={classes.values}
            color='primary'
          >
            {formatMoney(withdrawal.amount, withdrawal.asset.symbol)}
          </BoldTypography>
        </Grid>

        <Grid item xs={6}>
          <BoldTypography variant='subtitle2' className={classes.labels}>
            Memo:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant='subtitle2'
            className={classes.values}
            color='primary'
          >
            {withdrawal.memo}
          </BoldTypography>
        </Grid>
      </Grid>
      <Box m={4}>
        <BankDetails bank={withdrawal.bankAccount} />
      </Box>
    </Grid>
  )
}

export default WithdrawalView
