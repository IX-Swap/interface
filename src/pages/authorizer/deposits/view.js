import React from 'react';
import { Paper, Grid, Typography, Box } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { formatNumber } from 'helpers/formatNumbers';
import BankDetails from 'pages/accounts/bank/deposit/BankDetails';

const useStyles = makeStyles(() => ({
  infoGrid: {
    width: '300px',
    alignSelf: 'center',
    textAlign: 'center',
    padding: '10px',
  },
  labels: {
    textAlign: 'left',
  },
  values: {
    textAlign: 'right',
  },
}));

const BoldTypography = ({ children, ...others }: any) => (
  // eslint-disable-next-line
  <Typography {...others}>
    <b>{children}</b>
  </Typography>
);

function DepositView({ location }: RouteProps) {
  const { deposit } = location.state || {};
  const classes = useStyles();

  if (!deposit) {
    return <span>nothing to display</span>;
  }

  return (
    <>
      <Grid container justify="center" direction="column" component={Paper}>
        <Box pb={4} />
        <Grid container className={classes.infoGrid}>
          <Grid item xs={6}>
            <BoldTypography variant="subtitle2" className={classes.labels}>
              Transfer Code:
            </BoldTypography>
          </Grid>
          <Grid item xs={6}>
            <BoldTypography
              variant="subtitle2"
              className={classes.values}
              color="primary"
            >
              {deposit.depositCode}
            </BoldTypography>
          </Grid>

          <Grid item xs={6}>
            <BoldTypography variant="subtitle2" className={classes.labels}>
              Account No:
            </BoldTypography>
          </Grid>
          <Grid item xs={6}>
            <BoldTypography
              variant="subtitle2"
              className={classes.values}
              color="primary"
            >
              {deposit.bankAccount.bankAccountNumber}
            </BoldTypography>
          </Grid>

          <Grid item xs={6}>
            <BoldTypography variant="subtitle2" className={classes.labels}>
              Deposit Amount:
            </BoldTypography>
          </Grid>
          <Grid item xs={6}>
            <BoldTypography
              variant="subtitle2"
              className={classes.values}
              color="primary"
            >
              {deposit.asset.symbol} {formatNumber(deposit.amount)}
            </BoldTypography>
          </Grid>
        </Grid>
        <BankDetails bank={deposit.bankAccount} />
      </Grid>
    </>
  );
}

export default withRouter(DepositView);
