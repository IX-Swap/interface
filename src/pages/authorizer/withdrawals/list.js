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
import type { Withdraw } from './modules/types';
import WithdrawListModule from './modules';
import Actions from './modules/actions';
import DialogAuthorizeConfirmation from './confirm';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const {
  useAuhorizerWithdrawListState,
  useAuhorizerWithdrawListDispatch,
  AUTHORIZER_WITHDRAW_LIST_STATUS,
} = WithdrawListModule;
const {
  getWithdraws,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleWithdrawStatus,
} = Actions;

function useWithdrawListLogic() {
  const withdrawDispatch = useAuhorizerWithdrawListDispatch();
  const withdrawListState = useAuhorizerWithdrawListState();
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
  const [withdraw, setWithdraw] = useState<Withdraw | null>(null);
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
    if (status === AUTHORIZER_WITHDRAW_LIST_STATUS.INIT) {
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
  withdraw: Withdraw,
  handleSelectChange: (withdraw: Withdraw, status: string) => void,
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

const Withdraws = ({
  list,
  handleSelectChange,
}: {
  list: Array<Withdraw>,
  handleSelectChange: (withdraw: Withdraw, status: string) => void,
}) => (
  <TableBody>
    {list.map((row) => (
      <TableRow key={row._id}>
        <TableCell>{moment(row.createdAt).format('MM/DD/YYYY')}</TableCell>
        <TableCell>{row.bankAccount.accountHolderName}</TableCell>
        <TableCell align="left">{row.bankAccount.bankName}</TableCell>
        <TableCell align="left">
          {row.asset.symbol} {row.amount}
        </TableCell>
        <TableCell align="left">
          <RowStatusComponent
            withdraw={row}
            handleSelectChange={handleSelectChange}
          />
        </TableCell>
      </TableRow>
    ))}
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

  const handleSelectChange = (mWithdraw: Withdraw, status: string) => {
    setWithdraw(mWithdraw);
    setNewStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mWithdraw: Withdraw, status: string) => {
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
      {[AUTHORIZER_WITHDRAW_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="accounts table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>Date of Application</b>
              </TableCell>
              <TableCell align="left">
                <b>User</b>
              </TableCell>
              <TableCell align="left">
                <b>Bank</b>
              </TableCell>
              <TableCell align="left">
                <b>Amount</b>
              </TableCell>
              <TableCell align="left">
                <b>Status</b>
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
