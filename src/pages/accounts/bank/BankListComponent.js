// @flow
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  ButtonGroup,
  CircularProgress,
  LinearProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { withRouter, useHistory, RouteProps } from 'react-router-dom';

import EditBankComponent from './EditBankComponent';
import BankListModule from './modules';
import Actions from './modules/actions';
import { baseBankRequest } from './modules/types';
import type { Bank, BankRequest } from './modules/types';

const {
  useBanksListDispatch,
  useBanksListState,
  BANK_LIST_STATUS,
} = BankListModule;
const { getBankAccounts, setPage, setRowsPerPage, clearApiStatus } = Actions;

function useBankListLogic() {
  const bankDispatch = useBanksListDispatch();
  const bankListState = useBanksListState();
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
  const [activeBank, setActiveBank] = useState<BankRequest>(baseBankRequest);
  const [editOpen, setEditOpen] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const handleChangePage = (_, newPage: number) => {
    setPage(bankDispatch, { page: newPage });
  };

  const handleChangeRowsPerPage = (newRows: number) => {
    setRowsPerPage(bankDispatch, { rows: newRows });
    setPage(bankDispatch, { page: 0 });
  };

  const bankToBankRequest = (bank: Bank): BankRequest => ({
    _id: bank._id,
    asset: bank.asset._id,
    accountHolderName: bank.accountHolderName,
    bankName: bank.bankName,
    swiftCode: bank.swiftCode,
    bankAccountNumber: bank.bankAccountNumber,
  });

  const editBank = (bank: Bank) => {
    clearApiStatus(bankDispatch);
    setActiveBank(bankToBankRequest(bank));
    setEditOpen(true);
  };

  const closeEdit = (saved: boolean) => {
    setEditOpen(false);
    setEditSuccess(saved || false);
    setPage(bankDispatch, { page });
    setActiveBank(baseBankRequest);
    setTimeout(() => {
      if (mountedRef.current && saved) {
        setEditSuccess(false);
      }
    }, 5000);
  };

  useEffect(() => {
    if (status === BANK_LIST_STATUS.INIT) {
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
    activeBank,
    page,
    editOpen,
    statusCode,
    error,
    editSuccess,
    closeEdit,
    editBank,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

function BankListComponent(props: RouteProps) {
  const {
    error,
    items,
    status,
    total,
    limit,
    page,
    statusCode,

    editSuccess,
    editOpen,
    closeEdit,
    activeBank,

    editBank,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useBankListLogic();
  const history = useHistory();
  let componentToRender = <CircularProgress />;

  if ([BANK_LIST_STATUS.IDLE].includes(status)) {
    componentToRender = <AddBankAccount props={props} />;
  }

  const {
    location: { state },
  } = props;

  let isSaved = state && state.savedBank;

  if (isSaved) {
    setTimeout(() => {
      isSaved = false;
      props.history.replace({
        ...props.location,
        state: {},
      });
    }, 5000);
  }

  if (items.length > 0) {
    componentToRender = (
      <>
        <Box mt={3} mx={3} display="flex" justifyContent="flex-end">
          <Button
            m={3}
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`/accounts/banks/bank-create`);
            }}
          >
            ADD BANK ACCOUNT
          </Button>
        </Box>
        {(editSuccess || isSaved) && (
          <Box mx={3} mt={3}>
            <Alert severity="success">
              Successfully {isSaved ? 'added' : 'updated'} Bank Account!
            </Alert>
          </Box>
        )}
        {activeBank.bankAccountNumber && (
          <EditBankComponent
            open={editOpen}
            handleClose={() => closeEdit(false)}
            bank={activeBank}
            onFinish={() => closeEdit(true)}
          />
        )}

        <Grid item md={12}>
          <Box p={3}>
            {[BANK_LIST_STATUS.GETTING].includes(status) ? (
              <LinearProgress />
            ) : null}
            {items && items.length ? (
              <ListBankAccounts
                total={total}
                list={items}
                limit={limit}
                editBank={editBank}
                page={page}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                handleChangePage={handleChangePage}
              />
            ) : null}
          </Box>
        </Grid>
      </>
    );
  }

  if (statusCode === 403) {
    componentToRender = (
      <Box m={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        {componentToRender}
      </Grid>
    </Grid>
  );
}

type ListBankAccountsProps = {
  list: Array<Bank>,
  total: ?number,
  limit: number,
  page: number,
  editBank: Function,
  handleChangeRowsPerPage: (p: number) => void,
  handleChangePage: (_: SyntheticInputEvent<HTMLElement>, p: number) => void,
};

function ListBankAccounts({
  list,
  total,
  limit,
  page,
  editBank,
  handleChangeRowsPerPage,
  handleChangePage,
}: ListBankAccountsProps) {
  const history = useHistory();
  return (
    <TableContainer>
      <Table aria-label="accounts table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Currency</b>
            </TableCell>
            <TableCell align="left">
              <b>Bank</b>
            </TableCell>
            <TableCell align="center">
              <b>Account Number</b>
            </TableCell>
            <TableCell align="center">
              <b>Balance</b>
            </TableCell>
            <TableCell align="left">
              <b>Status</b>
            </TableCell>
            <TableCell align="left">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.asset.symbol}</TableCell>
              <TableCell align="left">{row.bankName}</TableCell>
              <TableCell align="right">{row.bankAccountNumber}</TableCell>
              <TableCell align="right">no data </TableCell>
              <TableCell align="center">
                {row.status === 'Approved' ? (
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group"
                  >
                    <Button
                      onClick={() => {
                        history.push(`/accounts/banks/deposit/${row._id}`);
                      }}
                    >
                      Deposit
                    </Button>
                    <Button
                      onClick={() => {
                        history.push(`/accounts/banks/withdraw/${row._id}`);
                      }}
                    >
                      Withdrawal
                    </Button>
                  </ButtonGroup>
                ) : (
                  'Account Pending'
                )}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    editBank(row);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {total && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
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

// TODO: fix this any
function AddBankAccount({ props }: any) {
  return (
    <Grid>
      <Box m={4} p={4}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography paragraph>
            You have not added a bank account. Please add a bank account.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.history.push(`/accounts/banks/bank-create`);
            }}
          >
            ADD BANK ACCOUNT
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}

export default withRouter(BankListComponent);
