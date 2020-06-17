// @flow
import React, { useState } from 'react';
import { Typography, TextField, Button, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import { snackbarService, ButtonWithLoading } from 'uno-material-ui';
import type { Asset } from 'context/assets/types';
import BankDetails from './BankDetails';
import { deposit } from './modules/actions';
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

export default function DepositConfirmation({
  bank,
  asset,
  amount,
  transactionCode,
}: {
  transactionCode: string,
  asset: Asset,
  bank: Bank,
  amount: number,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [twoFa, setTwoFa] = useState('');
  const [saving, setSaving] = useState(false);

  const fAmount = amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  console.log(asset);

  const handleBackButton = () => {
    history.push({
      pathname: '/accounts/banks',
    });
  };

  const handle2faChange = (evt: SyntheticInputEvent<HTMLElement>) => {
    setTwoFa(evt.target.value);
  };

  const handleDeposit = async () => {
    let message = 'Cannot deposit at this time, please try again later';
    let type = 'error';
    setSaving(true);
    const status = await deposit({
      amount,
      asset: asset._id,
      depositCode: transactionCode,
      otp: twoFa,
    });

    setSaving(false);
    if (status) {
      message = 'Deposit Cash Successful';
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
            Deposit Code:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant="subtitle2"
            className={classes.values}
            color="primary"
          >
            {transactionCode}
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
            Deposit Amount:
          </BoldTypography>
        </Grid>
        <Grid item xs={6}>
          <BoldTypography
            variant="subtitle2"
            className={classes.values}
            color="primary"
          >
            {asset.symbol} {fAmount}
          </BoldTypography>
        </Grid>
      </Grid>
      <BankDetails bank={bank} />

      <Typography variant="caption" align="center">
        You will be transferring {asset.symbol}
        {fAmount} in the above-mentioned bank account. Use the transfer code in
        the <br /> transfer remarks field. Please confirm your bank account
        before proceeding.
      </Typography>

      <Box my={4} alignSelf="center">
        <TextField
          id="two-fa"
          label="2-Factor Auth Code"
          variant="outlined"
          autoComplete="off"
          onChange={handle2faChange}
        />
      </Box>

      <Grid container justify="center">
        <Box component="div" mr={2} display="inline">
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
            onClick={handleDeposit}
          >
            Confirm Deposit
          </ButtonWithLoading>
        </Box>
      </Grid>
    </Grid>
  );
}
