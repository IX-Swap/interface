// @flow
import React from 'react';
import { Box } from '@material-ui/core';
import TableWithPagination from 'components/TableWithPagination';
import storageHelper from 'services/storageHelper';
import { columns } from './data';

export default function Overview() {
  return (
    <Box m={4}>
      <TableWithPagination
        id="authorizerBanksList"
        endpoint={`/accounts/balance/${storageHelper.getUserId()}`}
        columns={columns}
      />
    </Box>
  );
}
