// @flow
import React, { useRef, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Select,
  MenuItem,
  Paper,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { snackbarService } from 'uno-material-ui';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import type { Asset } from 'context/assets/types';
import type { DSWithdrawal, TableColumns } from './modules/types';
import WithdrawListModule from './modules';
import Actions from './modules/actions';
import DialogAuthorizeConfirmation from './confirm';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const {
  useAuhorizerDSWithdrawListState,
  useAuhorizerDSWithdrawListDispatch,
  AUTHORIZER_DS_WITHDRAW_LIST_STATUS,
} = WithdrawListModule;
const {
  getWithdraws,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleWithdrawStatus,
} = Actions;

function useWithdrawListLogic() {
  const withdrawDispatch = useAuhorizerDSWithdrawListDispatch();
  const withdrawListState = useAuhorizerDSWithdrawListState();
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = withdrawListState;
  const mountedRef = useRef(true);
  const [withdraw, setWithdraw] = useState<DSWithdrawal | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>('');

  const handleChangePage = (_, newPage: number) => {
    setPage(withdrawDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(withdrawDispatch, { rows: newRows });
    setPage(withdrawDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === AUTHORIZER_DS_WITHDRAW_LIST_STATUS.INIT) {
      getWithdraws(withdrawDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(withdrawDispatch);
    }
  }, [page, limit, status, withdrawDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    withdrawDispatch,
    items,
    status,
    total,
    limit,
    page,
    statusCode,
    error,
    handleChangePage,
    handleChangeRowsPerPage,
    open,
    setOpen,
    withdraw,
    setWithdraw,
    setPage,
    newStatus,
    setNewStatus,
  };
}

const RowStatusComponent = ({
  withdraw,
  handleSelectChange,
}: {
  withdraw: DSWithdrawal,
  handleSelectChange: (withdraw: DSWithdrawal, status: string) => void,
}) => {
  const classes = useStyles();
  switch (withdraw.status) {
    case 'Approved':
      return <Typography color="primary">Approved</Typography>;
    case 'Rejected':
      return <Typography color="error">Rejected</Typography>;
    default:
      return (
        <Select
          className={classes.formControl}
          value={withdraw.status}
          onChange={(evt: SyntheticInputEvent<HTMLElement>) =>
            handleSelectChange(withdraw, evt.target.value)
          }
          inputProps={{
            name: 'status',
          }}
        >
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      );
  }
};

const columns: Array<TableColumns> = [
  {
    key: 'createdAt',
    label: 'Date of Application',
    // $$FlowFixMe
    render: (a: string) => moment(a).format('MM/DD/YYYY hh:mm:ss a'),
  },
  {
    key: 'asset',
    label: 'Digital Security',
    // $$FlowFixMe
    render: (a: Asset) => a.symbol,
  },
  {
    key: 'recipientWallet',
    label: "Recipient's IXPS Address",
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    // $$FlowFixMe
    render: (amount: number) =>
      amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
  },
  {
    key: 'memo',
    label: 'Memo',
  },
];

const Withdraws = ({
  list,
  handleSelectChange,
}: {
  list: Array<DSWithdrawal>,
  handleSelectChange: (withdraw: DSWithdrawal, status: string) => void,
}) => (
  <TableBody>
    {list.length ? (
      list.map((row) => (
        <TableRow key={row._id}>
          {columns.map((e) => (
            <TableCell align={e.align || 'left'}>
              {e.render ? e.render(row[e.key]) : row[e.key]}
            </TableCell>
          ))}
          <TableCell align="left">
            <RowStatusComponent
              withdraw={row}
              handleSelectChange={handleSelectChange}
            />
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell align="center" colSpan={5}>
          No Data
        </TableCell>
      </TableRow>
    )}
  </TableBody>
);

export default function BanksList() {
  const {
    status: loadingStatus,
    items,
    total,
    limit,
    page,
    handleChangeRowsPerPage,
    handleChangePage,

    open,
    setOpen,
    withdraw,
    setWithdraw,
    newStatus,
    setNewStatus,
  } = useWithdrawListLogic();

  const handleSelectChange = (mWithdraw: DSWithdrawal, status: string) => {
    setWithdraw(mWithdraw);
    setNewStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mWithdraw: DSWithdrawal, status: string) => {
    const confirm = await toggleWithdrawStatus(mWithdraw, status);
    let message = 'Failed to update withdraw status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated withdraw status!';
      type = 'success';
      handleChangePage(null, page);
      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
  };

  return (
    <>
      {withdraw && (
        <DialogAuthorizeConfirmation
          open={open}
          newStatus={newStatus}
          handleClose={handleClose}
          withdraw={withdraw}
          handleConfirm={handleConfirm}
        />
      )}
      {[AUTHORIZER_DS_WITHDRAW_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="accounts table">
          <TableHead>
            <TableRow>
              {columns.map((e) => (
                <TableCell key={e.key}>
                  <b>{e.label}</b>
                </TableCell>
              ))}
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <Withdraws list={items} handleSelectChange={handleSelectChange} />
          {total && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={6}
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
