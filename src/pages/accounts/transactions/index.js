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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { useAssetsState } from 'context/assets';
import type { Asset } from 'context/assets/types';
import type { Transaction } from './modules/types';
import TransactionsListModule from './modules';

import Actions from './modules/actions';

const useStyles = makeStyles({
  form: {
    width: 270,
  },
});

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
  const tState = useTransactionsListState();
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

type FilterProps = {
  filters: Filters,
  assets: Array<Asset>,
  handleAssetChange: (ev: SyntheticInputEvent<HTMLElement>) => void,
  handleDateChange: (name: 'to' | 'from', date: Date) => void,
};

const FiltersComponent = ({
  filters,
  assets,
  handleAssetChange,
  handleDateChange,
}: FilterProps) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box mx={4}>
        <Grid container justify="space-between">
          <Grid item container direction="row" xs={12} sm={9}>
            <Box mr={2}>
              <KeyboardDatePicker
                className={classes.form}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="from-filter"
                label="From"
                value={filters.from}
                onChange={(date) => handleDateChange('from', date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                autoOk
              />
            </Box>
            <KeyboardDatePicker
              className={classes.form}
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="to-filter"
              label="To"
              value={filters.to}
              onChange={(date) => handleDateChange('to', date)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              autoOk
            />
          </Grid>
          <Grid item xs={12} sm={3} justify="flex-end" container>
            {assets && (
              <FormControl margin="normal" className={classes.form}>
                <InputLabel id="currency-selector-value-label">
                  Asset
                </InputLabel>
                <Select
                  fullWidth
                  label="Asset"
                  labelId="currency-selector"
                  id="currency-selector-value"
                  value={filters.asset}
                  onChange={handleAssetChange}
                >
                  {assets.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.symbol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        </Grid>
      </Box>
    </MuiPickersUtilsProvider>
  );
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
