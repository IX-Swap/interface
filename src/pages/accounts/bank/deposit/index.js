// @flow
import React, { useCallback, useState, useEffect, useRef } from 'react';
import RouteProps from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import storage from 'services/storageHelper';
import BankDepositForm from './DepositForm';
import DepositConfirmation from './DepositConfirmation';
import type { Bank } from '../modules/types';

import BankActions from '../modules/actions';
import BanksListModule from '../modules/index';

const { getBank } = BankActions;
const { useBanksListDispatch } = BanksListModule;

const useGenericBankLogic = (bankId: string) => {
  const [bank, setBank] = useState<Bank | null>(null);
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

  const deposit = (toDeposit: number) => {
    setAmount(toDeposit);
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
    deposit,
    amount,
    isConfirmation,
    setIsConfirmation,
  };
};

function BankDepositComponent({ bankId, code }: any) {
  const { bank, deposit, amount, isConfirmation } = useGenericBankLogic(bankId);

  let toRender = <span>loading</span>;

  if (bank) {
    toRender = (
      <BankDepositForm
        bank={bank}
        code={code}
        deposit={(toDeposit: number) => deposit(toDeposit)}
      />
    );
    if (isConfirmation) {
      toRender = (
        <DepositConfirmation
          bank={bank}
          amount={amount}
          transactionCode={code}
        />
      );
    }
  }

  return (
    <>
      <Box m={4}>
        {bank && <Typography variant="h3">Deposit Cash</Typography>}
      </Box>
      {toRender}
    </>
  );
}

function BankDepositHolder({ match }: RouteProps) {
  const { bankId } = match.params;
  const code = storage.generateRandom(8, 'A#');

  return <BankDepositComponent bankId={bankId} code={code} />;
}

export default BankDepositHolder;
