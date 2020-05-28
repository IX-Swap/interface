// @flow
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TableRow, TableCell, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { formatMoney, formatNumber } from 'helpers/formatNumbers';
import { Commitment } from './modules/types';
import { useInvestDispatch } from '../../modules';
import { setSelectedCommitment } from '../../modules/actions';

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
  const dispatch = useInvestDispatch();
  const history = useHistory();
  const { dso, pricePerUnit, totalAmount, numberOfUnits, status } = commitment;

  const onClickView = (e) => {
    e.preventDefault();

    setSelectedCommitment(dispatch, commitment);
    history.push('/invest/view-commitment');
  };

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
      <TableCell>
        <Button onClick={onClickView}>View</Button>
      </TableCell>
    </TableRow>
  );
};

export default CommitmentListItem;
