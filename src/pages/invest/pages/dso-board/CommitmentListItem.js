// @flow
import React from 'react';
import { useHistory } from 'react-router-dom';
import { TableRow, TableCell, Button } from '@material-ui/core';
import { formatMoney, formatNumber } from 'helpers/formatNumbers';
import DsoImage from 'components/Dso/DsoImage';
import { Commitment } from './modules/types';
import { useInvestDispatch } from '../../modules';
import { setSelectedCommitment } from '../../modules/actions';

const CommitmentListItem = ({ commitment }: { commitment: Commitment }) => {
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
        <DsoImage dsoId={(dso || {})._id} />
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
