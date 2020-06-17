// @flow
import React from 'react';
import moment from 'moment';
import { TableCell, TableRow, Button, Typography } from '@material-ui/core';
import type { Identity } from 'pages/identity/modules/types';

const IdentityListItem = ({
  identity,
  onClickView,
}: {
  identity: Identity,
  onClickView: (identity: Identity) => void,
}) => {
  const {
    firstName,
    lastName,
    createdAt,
    address: { country },
    status,
  } = identity;
  let statusColor = 'initial';
  if (status !== 'Unauthorized') {
    statusColor = status === 'Approved' ? 'primary' : 'error';
  }

  return (
    <TableRow>
      <TableCell>Individual</TableCell>
      <TableCell align="left">
        {moment(createdAt).format('MMMM DD, YYYY')}
      </TableCell>
      <TableCell align="left">{`${firstName} ${lastName}`}</TableCell>
      <TableCell align="left">{country}</TableCell>
      <TableCell align="left">
        <Typography color={statusColor}>{status}</Typography>
      </TableCell>
      <TableCell align="center">
        <Button type="button" onClick={() => onClickView(identity)}>
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default IdentityListItem;
