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
  LinearProgress,
  TablePagination,
  Box,
} from '@material-ui/core';
import moment from 'moment';
import { useAssetsState } from 'context/assets';
import type { BaseStateWithPagination } from 'context/base/withPagination/types';
import type { Transaction } from './modules/types';
import TransactionsListModule from './modules';
import FiltersComponent from './Filters';

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

type TableColumn = {
  label: string,
  key: $Keys<Transaction>,
  align?: string,
  render?: any,
};

const columns: Array<TableColumn> = [
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
    align: 'right',
    render: (value) =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
  {
    label: 'Credit',
    key: 'credit',
    align: 'right',
    render: (value) =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
  {
    label: 'Balance',
    key: 'runningTotal',
    align: 'right',
    render: (value) =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
];

const useAssets = () => {
  const assetsState = useAssetsState();
  return { assets: assetsState.assets };
};

type Filters = {
  asset: string,
  from: Date,
  to: Date,
};

const useTransactionsListLogic = () => {
  const tDispatch = useTransactionsListDispatch();
  const tState: BaseStateWithPagination<Transaction> = useTransactionsListState();
  const { assets } = useAssets();
  const { status, page, total, limit, items } = tState;
  const mountedRef = useRef(true);
  const [filter, setFilter] = useState<Filters>({
    asset: (assets.length && assets[0]._id) || '',
    from: new Date(),
    to: new Date(),
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

  const handleDateChange = (name: 'to' | 'from', date: Date) => {
    const mFilter = { ...filter };
    mFilter[name] = date;
    setFilter(mFilter);

    setPage(tDispatch, { page });
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
    handleDateChange,
  };
};

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
    handleDateChange,
  } = useTransactionsListLogic();

  return (
    <>
      <FiltersComponent
        filters={filter}
        assets={assets}
        handleDateChange={handleDateChange}
        handleAssetChange={handleAssetChange}
      />
      <Box mx={4} my={2}>
        <TableContainer>
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
                {items.map((row: Transaction, index) => (
                  <TableRow key={index}>
                    {columns.map((e) => (
                      <TableCell key={e.key} align={e.align || 'left'}>
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
                    colSpan={columns.length}
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
      </Box>
    </>
  );
}
