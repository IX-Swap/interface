// @flow
import React, { useState, useEffect, useRef } from 'react';
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';
import BankWithdrawForm from './WithdrawForm';
import WithdrawConfirmation from './WithdrawConfirmation';
import type { Bank } from '../modules/types';

import BankActions from '../modules/actions';
import BanksListModule from '../modules/index';
import WithdrawalList from './list';

const { getBankAccounts, setPage } = BankActions;
const {
  BANK_LIST_STATUS,
  useBanksListState,
  useBanksListDispatch,
} = BanksListModule;

const useGenericBankLogic = () => {
  const [bank, setBank] = useState<Bank | null>(null);
  const [memo, setMemo] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useBanksListDispatch();
  const { items: banks, status } = useBanksListState();
  const mountedRef = useRef(true);
  const [isConfirmation, setIsConfirmation] = useState<boolean>(false);

  useEffect(() => {
    if (status === BANK_LIST_STATUS.INIT) {
      getBankAccounts(dispatch, {
        ref: mountedRef,
        skip: 0,
        limit: 50,
        status: 'Approved',
      });
    }
  }, [dispatch, status]);

  useEffect(() => {
    setPage(dispatch, { page: 0 });
    return () => {
      mountedRef.current = false;
    };
  }, [dispatch]);

  const withdraw = (toWithdraw: number, mMemo: string) => {
    setMemo(mMemo);
    setAmount(toWithdraw);
    setIsConfirmation(true);
  };

  const onBankSelect = (evt) => {
    setBank(evt.target.value);
  };

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    bank,
    withdraw,
    amount,
    memo,
    banks,
    setMemo,
    isConfirmation,
    setIsConfirmation,
    onBankSelect,
  };
};

function BankWithdrawComponent() {
  const {
    bank,
    withdraw,
    amount,
    isConfirmation,
    memo,
    banks,
    onBankSelect,
  } = useGenericBankLogic();

  let toRender = null;

  if (bank) {
    toRender = <BankWithdrawForm bank={bank} withdraw={withdraw} />;
    if (isConfirmation) {
      toRender = (
        <WithdrawConfirmation memo={memo} bank={bank} amount={amount} />
      );
    }
  }

  return (
    <>
      <Box m={4}>
        <Typography variant="h3">Withdraw Cash</Typography>
      </Box>
      <Grid container justify="center">
        {!isConfirmation && (
          <FormControl style={{ minWidth: '200px' }}>
            <InputLabel id="currency-selector-input">
              To Bank Account
            </InputLabel>
            <Select
              labelId="currency-selector"
              id="currency-selector-value"
              value={bank || {}}
              onChange={onBankSelect}
            >
              {banks.map((item) => (
                <MenuItem key={item._id} value={item}>
                  {item.bankName} - {item.bankAccountNumber}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Grid item container style={{ marginTop: '16px' }}>
          {toRender}
        </Grid>
      </Grid>
      <Box m={4}>
        {bank && <Typography variant="h3">Recent Withdrawals</Typography>}
      </Box>
      <Box m={4}>
        <WithdrawalList />
      </Box>
    </>
  );
}

export default BankWithdrawComponent;
