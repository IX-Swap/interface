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
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { withRouter, useHistory } from 'react-router-dom';

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
const { getBankAccounts, setPage, setRowsPerPage } = Actions;

function useBankListLogic() {
  const bankDispatch = useBanksListDispatch();
  const bankListState = useBanksListState();
  const { status, page, total, limit, items } = bankListState;
  const mountedRef = useRef(true);
  const [activeBank, setActiveBank] = useState<BankRequest>(baseBankRequest);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (status === BANK_LIST_STATUS.INIT) {
      getBankAccounts(bankDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
    }
  }, [page, limit, status, bankDispatch]);

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
    setActiveBank(bankToBankRequest(bank));
    setEditOpen(true);
  };

  const closeEdit = () => {
    setEditOpen(false);
  };

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
    closeEdit,
    editBank,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

function BankListComponent(props) {
  const {
    items,
    status,
    total,
    limit,
    page,

    editOpen,
    closeEdit,
    activeBank,

    editBank,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useBankListLogic();

  let componentToRender = <CircularProgress />;

  if (status === BANK_LIST_STATUS.IDLE) {
    componentToRender = <AddBankAccount props={props} />;

    if (items.length > 0) {
      componentToRender = (
        <>
          <EditBankComponent
            open={editOpen}
            handleClose={closeEdit}
            bank={activeBank}
            onFinish={() => closeEdit()}
          />
          <ListBankAccounts
            total={total}
            list={items}
            limit={limit}
            editBank={editBank}
            page={page}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
          />
        </>
      );
    }
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
    <Grid item md={12}>
      <Box p={3}>
        <TableContainer>
          <Table aria-label="accounts table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Currency</b>
                </TableCell>
                <TableCell align="center">
                  <b>Account ID</b>
                </TableCell>
                <TableCell align="center">
                  <b>Balance</b>
                </TableCell>
                <TableCell align="center">
                  <b>Status</b>
                </TableCell>
                <TableCell align="center">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.asset.symbol}</TableCell>
                  <TableCell align="center">{row.bankAccountNumber}</TableCell>
                  <TableCell align="center">no data </TableCell>
                  <TableCell align="center">
                    {row.status === 'Authorized' ? (
                      <ButtonGroup
                        variant="text"
                        color="primary"
                        aria-label="text primary button group"
                      >
                        <Button
                          onClick={() => {
                            history.push('/accounts/deposit');
                          }}
                        >
                          Deposit
                        </Button>
                        <Button
                          onClick={() => {
                            history.push('/accounts/withdraw');
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
                    colSpan={5}
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
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push(`/accounts/bank-create`);
            }}
          >
            ADD BANK ACCOUNT
          </Button>
        </Box>
      </Box>
    </Grid>
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
              props.history.push(`/accounts/bank-create`);
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
