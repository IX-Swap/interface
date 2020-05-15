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

import { withRouter, useHistory } from 'react-router-dom';

import { useBanksListDispatch, useBanksListState } from './modules';
import { BANK_LIST_STATUS } from './modules/types';
import { getBankAccounts } from './modules/actions';
import type { Bank } from './modules/types';

function useBankListLogic() {
  const bankDispatch = useBanksListDispatch();
  const bankListState = useBanksListState();
  const { status } = bankListState;
  const mountedRef = useRef(true);

  useEffect(() => {
    if (status === BANK_LIST_STATUS.INIT) {
      getBankAccounts(bankDispatch, {
        ref: mountedRef,
      });
    }
  }, [status, bankDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return { bankDispatch, bankListState };
}

function BankListComponent(props) {
  const { bankListState } = useBankListLogic();

  let componentToRender = <CircularProgress />;

  if (bankListState.status === BANK_LIST_STATUS.IDLE) {
    componentToRender = <AddBankAccount props={props} />;

    if (bankListState.banks.length > 0) {
      componentToRender = <ListBankAccounts list={bankListState.banks} />;
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

function ListBankAccounts({ list }: { list: Array<Bank> }) {
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
                  <TableCell>{row.account.asset.symbol}</TableCell>
                  <TableCell align="center">{row.bankAccountNumber}</TableCell>
                  <TableCell align="center">{row.account.balance}</TableCell>
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
