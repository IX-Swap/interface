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
} from '@material-ui/core';
import { snackbarService } from 'uno-material-ui';
import { makeStyles } from '@material-ui/core/styles';
// TODO: move bank module to context?
import type { Bank } from 'pages/accounts/bank/modules/types';
import BankListModule from './modules';
import Actions from './modules/actions';
import DialogAuthorizeConfirmation from './confirm';

const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
  },
});

const {
  useAuhorizerBanksListState,
  useAuhorizerBanksListDispatch,
  AUTHORIZER_BANK_LIST_STATUS,
} = BankListModule;
const {
  getBankAccounts,
  setPage,
  setRowsPerPage,
  clearApiStatus,
  toggleBankStatus,
} = Actions;

function useBankListLogic() {
  const bankDispatch = useAuhorizerBanksListDispatch();
  const bankListState = useAuhorizerBanksListState();
  const {
    status,
    page,
    total,
    limit,
    items,
    statusCode,
    error,
  } = bankListState;
  const mountedRef = useRef(true);
  const [bank, setBank] = useState<Bank | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<string>('');

  const handleChangePage = (_, newPage: number) => {
    setPage(bankDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(bankDispatch, { rows: newRows });
    setPage(bankDispatch, { page: 0 });
  };

  useEffect(() => {
    if (status === AUTHORIZER_BANK_LIST_STATUS.INIT) {
      getBankAccounts(bankDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
      clearApiStatus(bankDispatch);
    }
  }, [page, limit, status, bankDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    bankDispatch,
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
    bank,
    setBank,
    setPage,
    newStatus,
    setNewStatus,
  };
}

const BankAccounts = ({
  list,
  handleSelectChange,
}: {
  list: Array<Bank>,
  handleSelectChange: (bank: Bank, status: string) => void,
}) => {
  const classes = useStyles();
  return (
    <TableBody>
      {list.map((row) => (
        <TableRow key={row._id}>
          <TableCell>{row.user.name}</TableCell>
          <TableCell align="left">{row.bankName}</TableCell>
          <TableCell align="left">{row.asset.symbol}</TableCell>
          <TableCell align="left">
            <Select
              className={classes.formControl}
              value={row.status}
              onChange={(evt: SyntheticInputEvent<HTMLElement>) =>
                handleSelectChange(row, evt.target.value)
              }
              inputProps={{
                name: 'status',
              }}
            >
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

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
    bank,
    setBank,
    newStatus,
    setNewStatus,
  } = useBankListLogic();

  const handleSelectChange = (mBank: Bank, status: string) => {
    setBank(mBank);
    setNewStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (mBank: Bank, status: string) => {
    const confirm = await toggleBankStatus(mBank, status);
    let message = 'Failed to update bank status!';
    let type = 'error';

    if (confirm) {
      message = 'Successfully updated bank status!';
      type = 'success';
      handleChangePage(null, page);
      setOpen(false);
    }

    snackbarService.showSnackbar(message, type);
  };

  return (
    <>
      {bank && (
        <DialogAuthorizeConfirmation
          open={open}
          newStatus={newStatus}
          handleClose={handleClose}
          bank={bank}
          handleConfirm={handleConfirm}
        />
      )}
      {[AUTHORIZER_BANK_LIST_STATUS.GETTING].includes(loadingStatus) ? (
        <LinearProgress />
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="accounts table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <b>User</b>
              </TableCell>
              <TableCell align="left">
                <b>Bank</b>
              </TableCell>
              <TableCell align="left">
                <b>Currency</b>
              </TableCell>
              <TableCell align="left">
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <BankAccounts list={items} handleSelectChange={handleSelectChange} />
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
