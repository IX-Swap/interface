// @flow
import React, { useState, useRef, useEffect } from 'react';
import {
  Table,
  TableContainer,
  TableFooter,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  LinearProgress,
  TablePagination,
  MenuItem,
  Select,
} from '@material-ui/core';
import moment from 'moment';
import { useAssetsState } from 'context/assets';
import TransactionsListModule from './modules';

import Actions from './modules/actions';

const {
  useTransactionsListDispatch,
  useTransactionsListState,
  TRANSACTIONS_LIST_STATUS,
} = TransactionsListModule;
const {
  getTransactionsList,
  setPage,
  setRowsPerPage,
  clearApiStatus,
} = Actions;

const useAssets = () => {
  const assetsState = useAssetsState();
  return { assets: assetsState.assets };
};

const useTransactionsListLogic = () => {
  const tDispatch = useTransactionsListDispatch();
  const tState = useTransactionsListState();
  const { assets } = useAssets();
  const { status, page, total, limit, items } = tState;
  const mountedRef = useRef(true);
  const [filter, setFilter] = useState({
    asset: assets[1]._id,
    from: moment(new Date()).format('MM-DD-YYYY'),
    to: moment(new Date()).format('MM-DD-YYYY'),
  });

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(tDispatch, { rows: newRows });
    setPage(tDispatch, { page: 0 });
  };

  const handleAssetChange = (ev: SyntheticInputEvent<HTMLElement>) => {
    setFilter({
      ...filter,
      asset: ev.target.value,
    });

    setPage(tDispatch, { page });
  };

  const handleChangePage = (_, newPage: number) => {
    setPage(tDispatch, { page: newPage });
  };

  useEffect(() => {
    if (status === TRANSACTIONS_LIST_STATUS.INIT) {
      getTransactionsList(tDispatch, {
        skip: page * limit,
        limit,
        ...filter,
        ref: mountedRef,
        asset: filter.asset,
      });
      clearApiStatus(tDispatch);
    }
  }, [filter, page, limit, status, tDispatch, assets]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    filter,
    setFilter,
    items,
    status,
    total,
    limit,
    page,
    assets,
    handleChangeRowsPerPage,
    handleChangePage,
    handleAssetChange,
  };
};

const columns = [
  {
    label: 'Transaction ID',
    key: 'transactionId',
  },
  {
    label: 'Date',
    key: 'date',
    render: (value) => moment(value).format('MM/DD/YYYY'),
  },
  {
    label: 'Type',
    key: 'type',
  },
  {
    label: 'Reference',
    key: 'reference',
  },
  {
    label: 'Debit',
    key: 'debit',
  },
  {
    label: 'Credit',
    key: 'credit',
  },
  {
    label: 'Balance',
    key: 'runningTotal',
    render: (value) => value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
];

export default function Transactions() {
  const {
    items,
    status,
    total,
    limit,
    page,
    filter,
    assets,
    handleChangeRowsPerPage,
    handleChangePage,
    handleAssetChange,
  } = useTransactionsListLogic();

  return (
    <>
      <Select
        fullWidth
        labelId="currency-selector"
        id="currency-selector-value"
        value={filter.asset}
        onChange={handleAssetChange}
      >
        {assets.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.symbol}
          </MenuItem>
        ))}
      </Select>
      <TableContainer component={Paper}>
        {status === TRANSACTIONS_LIST_STATUS.GETTING && <LinearProgress />}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((e) => (
                <TableCell key={e.label}>
                  <b>{e.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {status === TRANSACTIONS_LIST_STATUS.INIT && (
            <TableBody>
              <TableRow>
                <TableCell>loding</TableCell>
              </TableRow>
            </TableBody>
          )}
          {items && status === TRANSACTIONS_LIST_STATUS.IDLE && (
            <TableBody>
              {items.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((e) => (
                    <TableCell key={e.key}>
                      {(e.render && e.render(row[e.key])) || row[e.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
          {total && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={2}
                  count={total}
                  rowsPerPage={limit}
                  page={page}
                  onChangeRowsPerPage={(
                    evt: SyntheticInputEvent<HTMLElement>
                  ) => handleChangeRowsPerPage(parseInt(evt.target.value))}
                  onChangePage={handleChangePage}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
