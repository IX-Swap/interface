import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import type { Asset } from 'context/assets/types';
import type { Bank } from './modules/types';

const BankView = ({ bank, asset = {} }: { bank: Bank, asset?: Asset }) => (
  <Grid container spacing={4} style={{ maxWidth: '1000px' }}>
    <Grid item container>
      <Grid item xs={5}>
        <Typography>
          <b>Bank Name</b>
        </Typography>
        <Typography>{bank.bankName}</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>
          <b>Account Holder Name</b>
        </Typography>
        <Typography>{bank.accountHolderName}</Typography>
      </Grid>
      <Grid item xs={2} />
    </Grid>
    <Grid item container>
      <Grid item xs={5}>
        <Typography>
          <b>Currency</b>
        </Typography>
        <Typography>
          {bank.asset && bank.asset.symbol ? bank.asset.symbol : asset.symbol}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>
          <b>Bank Account Number</b>
        </Typography>
        <Typography>{bank.bankAccountNumber}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>
          <b>Swift Code</b>
        </Typography>
        <Typography>{bank.swiftCode}</Typography>
      </Grid>
    </Grid>
    {bank.address && Object.values(bank.address).join('').trim() && (
      <>
        <Grid item>
          <Typography variant="h6">Bank Address</Typography>
        </Grid>
        <Grid item container>
          <Grid item xs={5}>
            <Typography>
              <b>Line 1</b>
            </Typography>
            <Typography>{bank.address.line1}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              <b>Line 2</b>
            </Typography>
            <Typography>{bank.address.line2}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <b>City</b>
            </Typography>
            <Typography>{bank.address.city}</Typography>
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs={5}>
            <Typography>
              <b>State</b>
            </Typography>
            <Typography>{bank.address.state}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              <b>Country</b>
            </Typography>
            <Typography>{bank.address.country}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <b>Postal Code</b>
            </Typography>
            <Typography>{bank.address.postalCode}</Typography>
          </Grid>
        </Grid>
      </>
    )}
  </Grid>
);

export default BankView;
