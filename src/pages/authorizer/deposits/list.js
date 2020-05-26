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
import type { Deposit } from './modules/types';
import DepositListModule from './modules';
import Actions from './modules/actions';
import DialogAuthorizeConfirmation from './confirm';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const {
  useAuhorizerDepositListState,
  useAuhorizerDepositListDispatch,
  AUTHORIZER_DEPOSIT_LIST_STATUS,
} = DepositListModule;
const {
  getDeposits,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleDepositStatus,
} = Actions;

function useDepositListLogic() {
  const depositDispatch = useAuhorizerDepositListDispatch();
  const depositListState = useAuhorizerDepositListState();
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = depositListState;
  const mountedRef = useRef(true);
  const [deposit, setDeposit] = useState<Deposit | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>('');

  const handleChangePage = (_, newPage: number) => {
    setPage(depositDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(depositDispatch, { rows: newRows });
    setPage(depositDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === AUTHORIZER_DEPOSIT_LIST_STATUS.INIT) {
      getDeposits(depositDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(depositDispatch);
    }
  }, [page, limit, status, depositDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    depositDispatch,
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
    deposit,
    setDeposit,
    setPage,
    newStatus,
    setNewStatus,
  };
}

const RowStatusComponent = ({
  deposit,
  handleSelectChange,
}: {
  deposit: Deposit,
  handleSelectChange: (deposit: Deposit, status: string) => void,
}) => {
  const classes = useStyles();
  switch (deposit.status) {
    case 'Approved':
      return <Typography color="primary">Approved</Typography>;
    case 'Rejected':
      return <Typography color="error">Rejected</Typography>;
    default:
      return (
        <Select
          className={classes.formControl}
          value={deposit.status}
          onChange={(evt: SyntheticInputEvent<HTMLElement>) =>
            handleSelectChange(deposit, evt.target.value)
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

const Deposits = ({
  list,
  handleSelectChange,
}: {
  list: Array<Deposit>,
  handleSelectChange: (deposit: Deposit, status: string) => void,
}) => (
  <TableBody>
    {list.length ? (
      list.map((row) => (
        <TableRow key={row._id}>
          <TableCell>{row.level}</TableCell>
          <TableCell>{moment(row.createdAt).format("MM/DD/YYYY")}</TableCell>
          <TableCell>{row.bankAccount.accountHolderName}</TableCell>
          <TableCell align="left">{row.bankAccount.bankName}</TableCell>
          <TableCell align="left">
            {row.asset.symbol} {row.amount}
          </TableCell>
          <TableCell align="left">
            <RowStatusComponent
              deposit={row}
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

export default function DepositsList() {
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
    deposit,
    setDeposit,
    newStatus,
    setNewStatus,
  } = useDepositListLogic();

  const handleSelectChange = (mDeposit: Deposit, status: string) => {
    setDeposit(mDeposit);
    setNewStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mDeposit: Deposit, status: string) => {
    const confirm = await toggleDepositStatus(mDeposit, status);
    let message = 'Failed to update deposit status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated deposit status!';
      type = 'success';
      handleChangePage(null, page);
      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
  };

  return (
    <>
      {deposit && (
        <DialogAuthorizeConfirmation
          open={open}
          newStatus={newStatus}
          handleClose={handleClose}
          deposit={deposit}
          handleConfirm={handleConfirm}
        />
      )}
      {[AUTHORIZER_DEPOSIT_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="accounts table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>Level</b>
              </TableCell>
              <TableCell align="left">
                <b>Date of Application</b>
              </TableCell>
              <TableCell align="left">
                <b>User</b>
              </TableCell>
              <TableCell align="left">
                <b>Deposit</b>
              </TableCell>
              <TableCell align="left">
                <b>Amount</b>
              </TableCell>
              <TableCell align="left">
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <Deposits list={items} handleSelectChange={handleSelectChange} />
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
