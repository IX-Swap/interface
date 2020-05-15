// @flow
import React, { useEffect, useRef } from 'react';
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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { withRouter, useHistory } from 'react-router-dom';

import { useBanksListDispatch, useBanksListState } from './modules';
import { BANK_LIST_STATUS } from './modules/types';
import { getBankAccounts, setPage, setRowsPerPage } from './modules/actions';
import type { Bank } from './modules/types';

function useBankListLogic() {
  const bankDispatch = useBanksListDispatch();
  const bankListState = useBanksListState();
  const { status, page, limit } = bankListState;
  const mountedRef = useRef(true);

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

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    bankDispatch,
    bankListState,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}

function BankListComponent(props) {
  const {
    bankListState,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useBankListLogic();

  let componentToRender = <CircularProgress />;

  if (bankListState.status === BANK_LIST_STATUS.IDLE) {
    componentToRender = <AddBankAccount props={props} />;

    if (bankListState.banks.length > 0) {
      componentToRender = (
        <ListBankAccounts
          total={bankListState.total}
          list={bankListState.banks}
          limit={bankListState.limit}
          page={bankListState.page}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleChangePage={handleChangePage}
        />
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
  handleChangeRowsPerPage: (p: number) => void,
  handleChangePage: (_: SyntheticInputEvent<HTMLElement>, p: number) => void,
};

function ListBankAccounts({
  list,
  total,
  limit,
  page,
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
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.asset.symbol}</TableCell>
                  <TableCell align="center">{row.bankAccountNumber}</TableCell>
                  <TableCell align="center">no data </TableCell>
                  <TableCell align="center">
                    {row.authorized ? (
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
                </TableRow>
              ))}
            </TableBody>
            {total && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={4}
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

function AddBankAccount({ props }) {
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
