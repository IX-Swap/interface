// @flow
import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { snackbarService, ButtonWithLoading } from 'uno-material-ui';
import { withdraw } from './modules/actions';
import type { Bank } from '../modules/types';

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

export default function WithdrawConfirmation({
  bank,
  memo,
  amount,
}: {
  bank: Bank,
  amount: number,
  memo: string,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [twoFa, setTwoFa] = useState('');
  const [saving, setSaving] = useState(false);

  const fAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  const handleBackButton = () => {
    history.push({
      pathname: '/accounts/banks',
    });
  };

  const handle2faChange = (evt: SyntheticInputEvent<HTMLElement>) => {
    setTwoFa(evt.target.value);
  };

  const handleWithdraw = async () => {
    let message = 'Cannot withdraw at this time, please try again later';
    let type = 'error';
    setSaving(true);
    const status = await withdraw({
      amount,
      bank: bank._id,
      memo,
      otp: twoFa,
    });

    setSaving(false);
    if (status) {
      message = 'Withdraw Cash Successful';
      type = 'success';
    }

    snackbarService.showSnackbar(message, type);
    setTimeout(() => {
      handleBackButton();
    }, 1000);
  };

  return (
    <Grid container justify="center" direction="column">
      <Box p={2}>
        <Typography variant="subtitle1" align="center">
          <b>Are you sure you want to continue with this transaction?</b>
        </Typography>
      </Box>

      <Grid container className={classes.infoGrid}>
        <Grid item xs={6}>
          <BoldTypography variant="subtitle2" className={classes.labels}>
            Bank:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant="subtitle2"
            className={classes.values}
            color="primary"
          >
            {bank.bankName}
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
            {bank.bankAccountNumber}
          </BoldTypography>
        </Grid>

        <Grid item xs={6}>
          <BoldTypography variant="subtitle2" className={classes.labels}>
            Withdraw Amount:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant="subtitle2"
            className={classes.values}
            color="primary"
          >
            {bank.asset.symbol} {fAmount}
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
            {memo}
          </BoldTypography>
        </Grid>
      </Grid>

      <Typography variant="caption" align="center" my={4}>
        <Box my={3}>
          You will be withdrawing {bank.asset.symbol}
          {fAmount} to the above-mentioned bank account. <br /> Please confirm
          your bank account before proceeding.
        </Box>
      </Typography>

      <Box mb={4} alignSelf="center">
        <TextField
          id="two-fa"
          label="2-Factor Auth Code"
          autoComplete="off"
          variant="outlined"
          onChange={handle2faChange}
        />
      </Box>

      <Grid container justify="center">
        <Box component="div" mr={2} mb={4} display="inline">
          <Button color="default" onClick={handleBackButton}>
            Cancel
          </Button>
        </Box>
        <Box mb={4}>
          <ButtonWithLoading
            isFetching={saving}
            disableElevation
            disabled={!amount}
            variant="contained"
            color="primary"
            onClick={handleWithdraw}
          >
            Confirm Withdraw
          </ButtonWithLoading>
        </Box>
      </Grid>
    </Grid>
  );
}
