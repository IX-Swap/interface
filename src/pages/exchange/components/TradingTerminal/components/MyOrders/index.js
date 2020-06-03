import React, { useState, useEffect } from 'react';
import moment from 'moment';
import io from 'socket.io-client';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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

// Utils
import { numberWithCommas } from 'utils/utils';

// Modules
import MyOrderActions from './modules/actions';

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
const userId = localStore.getUserId();

export default function TableMyOrders(props) {
  const { id, data } = props;
  const [myOrders, setMyOrders] = useState(false);
  const classes = useStyles();
  const { SUBSCRIBE_API } = ENDPOINT_URL;
  const { MY_ORDERS } = SUBSCRIBE_API;

  /*eslint-disable */
  useEffect(() => {
    const socket = io(`${API_URL}?token=${bearerToken}`);
    socket.emit(MY_ORDERS.emit, id);
    socket.on(`${MY_ORDERS.on}/${id}`, (data) => {
      setMyOrders(data);
    });

    return () => {
      socket.off(`${MY_ORDERS.on}/${id}`);
  };
  }, []);
  /*eslint-disable */

  /*eslint-disable */
  const _handleCancelOrder = order => {
    const payload = {
      ...order,
      pair: id,
      type: 'LIMIT',
    };

    MyOrderActions.cancelOrder(userId, order._id, payload);
  };
  /*eslint-disable */

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
              myOrders.length ?
              myOrders.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {moment(row.createdAt).format(DATE_FORMAT)}
                  </TableCell>
                  <TableCell>{data && data.name}</TableCell>
                  <TableCell>{row.side}</TableCell>
                  <TableCell>{numberWithCommas(row.price)}</TableCell>
                  <TableCell>{numberWithCommas(row.amount)}</TableCell>
                  <TableCell>{row.totalFilled}</TableCell>
                  <TableCell>{numberWithCommas(row.price * row.amount)}</TableCell>
                  <TableCell>
                    <Button 
                      color="primary"
                      onClick={() => _handleCancelOrder(row)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              )) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
