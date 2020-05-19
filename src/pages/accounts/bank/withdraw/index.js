// @flow
import React, { useCallback, useState, useEffect, useRef } from 'react';
import RouteProps from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import BankWithdrawForm from './WithdrawForm';
import WithdrawConfirmation from './WithdrawConfirmation';
import type { Bank } from '../modules/types';

import BankActions from '../modules/actions';
import BanksListModule from '../modules/index';

const { getBank } = BankActions;
const { useBanksListDispatch } = BanksListModule;

const useGenericBankLogic = (bankId: string) => {
  const [bank, setBank] = useState<Bank | null>(null);
  const [memo, setMemo] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const dispatch = useBanksListDispatch();
  const mountedRef = useRef(true);
  const [isConfirmation, setIsConfirmation] = useState<boolean>(false);

  const getBankData = useCallback(
    async (bId: string) => {
      const bankData = await getBank(dispatch, { bankId: bId });
      if (!mountedRef.current) {
        return;
      }

      setBank(bankData);
    },
    [dispatch]
  );

  const withdraw = (toWithdraw: number, mMemo: string) => {
    setMemo(mMemo);
    setAmount(toWithdraw);
    setIsConfirmation(true);
  };

  useEffect(() => {
    getBankData(bankId);
  }, [getBankData, bankId]);

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
    setMemo,
    isConfirmation,
    setIsConfirmation,
  };
};

function BankWithdrawComponent({ match }: RouteProps) {
  const { bankId } = match.params;
  const { bank, withdraw, amount, isConfirmation, memo } = useGenericBankLogic(
    bankId
  );

  let toRender = <span>loading</span>;

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
        {bank && <Typography variant="h3">Withdraw Cash</Typography>}
      </Box>
      {toRender}
    </>
  );
}

export default BankWithdrawComponent;
