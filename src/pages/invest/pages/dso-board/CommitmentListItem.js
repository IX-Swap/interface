// @flow
import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { formatMoney, formatNumber } from 'helpers/formatNumbers';
import { Commitment } from './modules/types';

const useStyles = makeStyles(() => ({
  logo: {
    height: '42px',
    width: '42px',
    borderRadius: '42px',
    backgroundColor: '#eaeaea',
  },
}));

const CommitmentListItem = ({ commitment }: { commitment: Commitment }) => {
  const classes = useStyles();
  const { dso, pricePerUnit, totalAmount, numberOfUnits, status } = commitment;

  return (
    <TableRow>
      <TableCell>
        <div className={classes.logo} />
      </TableCell>
      <TableCell>{dso.tokenSymbol}</TableCell>
      <TableCell>{formatMoney(pricePerUnit)}</TableCell>
      <TableCell>{dso.capitalStructure}</TableCell>
      <TableCell>{formatMoney(totalAmount)}</TableCell>
      <TableCell>{formatNumber(numberOfUnits)}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
};

export default CommitmentListItem;
