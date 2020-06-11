import React from 'react';
import { Paper, Grid, Typography, Box } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { formatNumber } from 'helpers/formatNumbers';

const useStyles = makeStyles(() => ({
  infoGrid: {
    width: '500px',
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

function WithdrawalView({ location }: RouteProps) {
  const { withdrawal } = location.state || {};

  const classes = useStyles();

  if (!withdrawal) return <span>nothing to display</span>;

  return (
    <Grid container justify="center" direction="column" component={Paper}>
      <Box pb={4} />
      <Grid container className={classes.infoGrid}>
        {withdrawal.individual && (
          <>
            <Grid item xs={6}>
              <BoldTypography variant="subtitle2" className={classes.labels}>
                By:
              </BoldTypography>
            </Grid>
            <Grid item xs={6}>
              <BoldTypography
                variant="subtitle2"
                className={classes.values}
                color="primary"
              >
                {withdrawal.individual.firstName}{' '}
                {withdrawal.individual.lastName}
              </BoldTypography>
            </Grid>
          </>
        )}

        <Grid item xs={6}>
          <BoldTypography variant="subtitle2" className={classes.labels}>
            Status:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant="subtitle2"
            className={classes.values}
            color="primary"
          >
            {withdrawal.status}
          </BoldTypography>
        </Grid>

        <Grid item xs={4}>
          <BoldTypography variant="subtitle2" className={classes.labels}>
            Address:
          </BoldTypography>
        </Grid>
        <Grid item xs={8}>
          <BoldTypography
            variant="subtitle2"
            className={classes.values}
            color="primary"
          >
            {withdrawal.recipientWallet}
          </BoldTypography>
        </Grid>

        <Grid item xs={6}>
          <BoldTypography variant="subtitle2" className={classes.labels}>
            Withdrawal Amount:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant="subtitle2"
            className={classes.values}
            color="primary"
          >
            {withdrawal.asset.symbol} {formatNumber(withdrawal.amount)}
          </BoldTypography>
        </Grid>

        <Grid item xs={6}>
          <BoldTypography variant="subtitle2" className={classes.labels}>
            Memo:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant="subtitle2"
            className={classes.values}
            color="primary"
          >
            {withdrawal.memo}
          </BoldTypography>
        </Grid>
      </Grid>
      <Box pb={4} />
    </Grid>
  );
}

export default withRouter(WithdrawalView);
