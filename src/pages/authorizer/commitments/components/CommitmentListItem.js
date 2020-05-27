import React from 'react';
import type { Commitment } from 'context/commitment/types';
import { TableRow, TableCell, Button } from '@material-ui/core';

const CommitmentListItem = ({
  commitment,
  onClickView,
}: {
  commitment: Commitment,
  onClickView: Function,
}) => (
  <TableRow>
    <TableCell>Individual</TableCell>
    <TableCell>04/20/20</TableCell>
    <TableCell>Maikko</TableCell>
    <TableCell>Maikko</TableCell>
    <TableCell>ProjectName</TableCell>
    <TableCell>$102</TableCell>
    <TableCell>1000</TableCell>
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

export default CommitmentListItem;
