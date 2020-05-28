// @flow
import React from 'react';
import { Paper, Box } from '@material-ui/core';

import type { Bank } from '../modules/types';

const BankDetails = ({ bank, code }: { bank: Bank, code?: string }) => (
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
