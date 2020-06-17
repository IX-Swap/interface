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
  Grid,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import type { BaseStateWithPagination } from 'context/base/withPagination/types';

import { useAssetsState, useAssetsDispatch } from 'context/assets';
import { ASSETS_STATUS } from 'context/assets/types';
import * as AssetsActions from 'context/assets/actions';

import type { Transaction } from './modules/types';
import TransactionsListModule from './modules';
import FiltersComponent from './Filters';

import Actions from './modules/actions';

const { setAssetType } = AssetsActions;

const {
  useTransactionsListDispatch,
  useTransactionsListState,
  TRANSACTIONS_LIST_STATUS,
} = TransactionsListModule;

const { getTransactionsList, setPage, setRowsPerPage } = Actions;

type TableColumn = {
  label: string,
  key: $Keys<Transaction>,
  align?: string,
  headAlign?: string,
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
    headAlign: 'right',
    align: 'right',
    render: (value) =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
  {
    label: 'Credit',
    key: 'credit',
    headAlign: 'right',
    align: 'right',
    render: (value) =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
  {
    label: 'Balance',
    key: 'runningTotal',
    headAlign: 'right',
    align: 'right',
    render: (value) =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
];

const useAssets = () => {
  const mountedRef = useRef(true);
  const { status: assetsStatus, type, assets } = useAssetsState();
  const aDispatch = useAssetsDispatch();

  useEffect(() => {
    if (
      assetsStatus === ASSETS_STATUS.INIT ||
      ['Currency', 'Security'].includes(type)
    ) {
      setAssetType(aDispatch, { ref: mountedRef, type: undefined });
    }
  }, [aDispatch, assetsStatus, type]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return { assets, type };
};

type Filters = {
  asset: string,
  from: Date,
  to: Date,
};

const useTransactionsListLogic = () => {
  const tDispatch = useTransactionsListDispatch();
  const tState: BaseStateWithPagination<Transaction> = useTransactionsListState();
  const { assets, type } = useAssets();
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
    if (!type && status === TRANSACTIONS_LIST_STATUS.INIT) {
      getTransactionsList(tDispatch, {
        skip: page * limit,
        limit,
        ...filter,
        ref: mountedRef,
        asset: filter.asset,
      });
    }
  }, [type, filter, page, limit, status, tDispatch, assets]);

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
      <Box mx={4} mt={4} mb={2}>
        <Grid item xs={3}>
          <Typography variant="h3">Transactions</Typography>
        </Grid>
      </Box>
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
                  <TableCell key={e.label} align={e.headAlign || 'left'}>
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
