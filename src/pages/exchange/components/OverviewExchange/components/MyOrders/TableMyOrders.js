import React, { useState, useEffect } from 'react';
import moment from 'moment';
import io from 'socket.io-client';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Config/Endpoints
import { ENDPOINT_URL, API_URL, DATE_FORMAT } from 'config';
import localStore from 'services/storageHelper';

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
    maxHeight: 450,
  },
  tableTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 600,
    margin: '15px 0 10px',
  },
});

// Subscribe to SOCKET.IO
const bearerToken = localStore.getAccessToken();
const socket = io(`${API_URL}?token=${bearerToken}`);

export default function TableMyOrders(props) {
  const [myOrders, setMyOrders] = useState(false);
  const classes = useStyles();
  const { SUBSCRIBE_API } = ENDPOINT_URL;
  const { MY_ORDERS } = SUBSCRIBE_API;
  const _id = '5ecb739f1f3e88614b36ddcb';

  useEffect(() => {
    socket.emit(MY_ORDERS.emit, _id);
    socket.on(`${MY_ORDERS.on}/${_id}`, (data) => {
      setMyOrders(data);
    });
    // @Paul pls review
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography className={classes.tableTitle} variant="h3">
        Open Orders
      </Typography>
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
              <StyledTableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {myOrders &&
              myOrders.length &&
              myOrders.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {moment(row.createdAt).format(DATE_FORMAT)}
                  </TableCell>
                  <TableCell>TODO</TableCell>
                  <TableCell>{row.side}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.totalFilled}</TableCell>
                  <TableCell>{row.price * row.amount}</TableCell>
                  <TableCell>Cancel</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
