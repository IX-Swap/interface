// @flow
import React from 'react';
import { Paper, Box } from '@material-ui/core';

import type { Bank } from '../modules/types';

const BankDetails = ({
  bank,
  code,
  address,
}: {
  bank: Bank,
  address?: ?string,
  code?: string,
}) => (
  <Box m={4}>
    <Paper>
      <Box px={4} py={2}>
        <p>
          <b>{bank.bankName}</b>
        </p>
        <p>
          <b>Swift:</b>
          &nbsp;{bank.swiftCode}
        </p>
        {bank.address && (
          <p>
            <b>Bank Address:</b>
            &nbsp;{bank.address.line1}
            {bank.address.line2}
            {bank.address.city}
            {bank.address.state}
            {bank.address.country}
            {bank.address.postalCode}
          </p>
        )}
        <p>
          <b>Account:</b>
          &nbsp;{bank.accountHolderName}
        </p>
        <p>
          <b>Account Number:</b>
          &nbsp;{bank.bankAccountNumber}
        </p>
        {code && (
          <p>
            <b>Deposit Code:</b>
            &nbsp;{code}
          </p>
        )}
      </Box>
    </Paper>
  </Box>
);

export default BankDetails;
