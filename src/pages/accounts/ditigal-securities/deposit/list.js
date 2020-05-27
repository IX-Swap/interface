// @flow
import React, { useEffect, useRef } from 'react';
import {
  TableContainer,
  TableRow,
  TableCell,
  TableFooter,
  TableBody,
  TablePagination,
  Table,
  TableHead,
  LinearProgress,
} from '@material-ui/core';
import { get } from 'lodash';
import moment from 'moment';
import DSModule from './modules/index';
import DSActions from './modules/actions';
import type { DSDeposit } from './modules/types';

const {
  useDSDepositsListDispatch,
  useDSDepositsListState,
  DS_DEPOSITS_LIST_STATUS,
} = DSModule;

const { setPage, setRowsPerPage, getDigitalSecurityDeposits } = DSActions;

const useDepositsListLogic = (assetId: string) => {
  const mountedRef = useRef(true);
  const dsDispatch = useDSDepositsListDispatch();
  const { page, limit, items, status, total } = useDSDepositsListState();

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(dsDispatch, { rows: newRows });
    setPage(dsDispatch, { page: 0 });
  };

  const handleChangePage = (_, newPage: number) => {
    setPage(dsDispatch, { page: newPage });
  };

  useEffect(() => {
    if (status === DS_DEPOSITS_LIST_STATUS.INIT) {
      getDigitalSecurityDeposits(dsDispatch, {
        skip: page * limit,
        limit,
        // assetId,
        ref: mountedRef,
      });
    }
  }, [page, limit, status, dsDispatch, assetId]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    items,
    handleChangePage,
    handleChangeRowsPerPage,
    total,
    limit,
    page,
    status,
  };
};

type TableColumn = {
  label: string,
  key: $Keys<DSDeposit>,
  align?: string,
  render?: any,
};

const columns: Array<TableColumn> = [
  {
    label: 'Digital Security',
    // $FlowFixMe
    key: 'asset.symbol',
  },
  {
    label: 'Status',
    key: 'status',
  },
  {
    label: 'Amount',
    key: 'amount',
    align: 'right',
    render: (value) =>
      value && value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
  {
    label: 'Date',
    key: 'date',
    render: (value) => moment(value).format('MM/DD/YYYY'),
  },
  {
    label: 'Information',
    key: 'hash',
  },
];

export default function DepositList({ assetId }: { assetId: string }) {
  const {
    status,
    total,
    limit,
    page,
    items,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useDepositsListLogic(assetId);
  return (
    <TableContainer>
      {status === DS_DEPOSITS_LIST_STATUS.GETTING && <LinearProgress />}
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
        {status === DS_DEPOSITS_LIST_STATUS.INIT && (
          <TableBody>
            <TableRow>
              <TableCell>loding</TableCell>
            </TableRow>
          </TableBody>
        )}
        {items && status === DS_DEPOSITS_LIST_STATUS.IDLE && (
          <TableBody>
            {items.map((row, index) => (
              <TableRow key={index}>
                {columns.map((e) => (
                  <TableCell key={e.key} align={e.align || 'left'}>
                    {(e.render && e.render(get(row, e.key))) || get(row, e.key)}
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
                onChangeRowsPerPage={(evt: SyntheticInputEvent<HTMLElement>) =>
                  handleChangeRowsPerPage(parseInt(evt.target.value))
                }
                onChangePage={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
