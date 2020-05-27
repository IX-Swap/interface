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
import type { DSWithdrawal } from './modules/types';

const {
  useDSWithdrawalsListDispatch,
  useDSWithdrawalsListState,
  DS_WITHDRAWALS_LIST_STATUS,
} = DSModule;

const { setPage, setRowsPerPage, getDigitalSecurityWithdrawals } = DSActions;

const useWithdrawalsListLogic = (assetId: string) => {
  const mountedRef = useRef(true);
  const dsDispatch = useDSWithdrawalsListDispatch();
  const { page, limit, items, status, total } = useDSWithdrawalsListState();

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(dsDispatch, { rows: newRows });
    setPage(dsDispatch, { page: 0 });
  };

  const handleChangePage = (_, newPage: number) => {
    setPage(dsDispatch, { page: newPage });
  };

  useEffect(() => {
    if (status === DS_WITHDRAWALS_LIST_STATUS.INIT) {
      getDigitalSecurityWithdrawals(dsDispatch, {
        skip: page * limit,
        limit,
        asset: assetId,
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
  key: $Keys<DSWithdrawal>,
  align?: string,
  render?: (val: string) => string,
};

const columns: Array<TableColumn> = [
  {
    label: "Digital Security",
    // $FlowFixMe
    key: "asset.symbol",
  },
  {
    label: "Status",
    key: "status",
  },
  {
    label: "Amount",
    key: "amount",
    align: "right",
    render: (value) =>
      value &&
      parseFloat(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,"),
  },
  {
    label: "Date",
    key: "date",
    render: (value) => moment(value).format("MM/DD/YYYY"),
  },
  {
    label: "Memo",
    key: "memo",
  },
];

export default function WithdrawalList({ assetId }: { assetId: string }) {
  const {
    status,
    total,
    limit,
    page,
    items,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useWithdrawalsListLogic(assetId);
  return (
    <TableContainer>
      {status === DS_WITHDRAWALS_LIST_STATUS.GETTING && <LinearProgress />}
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
        {status === DS_WITHDRAWALS_LIST_STATUS.INIT && (
          <TableBody>
            <TableRow>
              <TableCell>loding</TableCell>
            </TableRow>
          </TableBody>
        )}
        {items && status === DS_WITHDRAWALS_LIST_STATUS.IDLE && (
          <TableBody>
            {items.map((row, index) => (
              <TableRow key={index}>
                {columns.map((e) => (
                  <TableCell key={e.key} align={e.align || 'left'}>
                    {(e.render &&
                      e.render(get<DSWithdrawal, string>(row, e.key))) ||
                      get(row, e.key)}
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
