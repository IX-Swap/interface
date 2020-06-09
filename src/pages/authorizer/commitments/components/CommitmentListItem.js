// @flow
import React from 'react';
import moment from 'moment';
import type { Commitment } from 'context/commitment/types';
import { TableRow, TableCell, Button } from '@material-ui/core';
import { formatMoney, formatNumber } from 'helpers/formatNumbers';

const CommitmentListItem = ({
  commitment,
  onClickView,
}: {
  commitment: Commitment,
  onClickView: Function,
}) => {
  const {
    createdAt,
    dso,
    individual,
    totalAmount,
    numberOfUnits,
    currency,
    status,
  } = commitment;

  console.log(commitment);

  return (
    <TableRow>
      <TableCell>Individual</TableCell>
      <TableCell>{moment(createdAt).format('MM/DD/YYYY')}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{`${individual.firstName} ${individual.lastName}`}</TableCell>
      <TableCell>{dso.issuerName}</TableCell>
      <TableCell>{dso.tokenName}</TableCell>
      <TableCell align="right">
        {formatMoney(totalAmount, (currency || {}).symbol)}
      </TableCell>
      <TableCell align="right">{formatNumber(numberOfUnits)}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onClickView(commitment);
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CommitmentListItem;
