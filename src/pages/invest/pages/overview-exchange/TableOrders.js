import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#f7f7f7',
      color: '#a7a7a7',
    },
    body: {
      fontSize: 12,
    },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(date, pair, side, price, amount, filled, total, cancel) {
  return { date, pair, side, price, amount, filled, total, cancel };
}

const rows = [
  createData('04/01/20', 'IXPS/SGD', 'Buy', 3.50, 20000, 100, 70000, true),
  createData('04/01/20', 'IXPS/SGD', 'Buy', 3.50, 20000, 100, 70000, true),
  createData('04/01/20', 'IXPS/SGD', 'Buy', 3.50, 20000, 100, 70000, true),
  createData('04/01/20', 'IXPS/SGD', 'Buy', 3.50, 20000, 100, 70000, true),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Pair</StyledTableCell>
            <StyledTableCell>Side</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Filled</StyledTableCell>
            <StyledTableCell>Total</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.date}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.pair}</TableCell>
              <TableCell>{row.side}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.filled}</TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell>Cancel</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}