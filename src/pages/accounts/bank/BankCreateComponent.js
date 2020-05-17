// @flow
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAssetsState, useAssetsDispatch } from 'context/assets';
import { ASSETS_STATUS } from 'context/assets/types';
import * as AssetsActions from 'context/assets/actions';
import BankFormComponent from './BankFormComponent';

import Actions from './modules/actions';
import type { BankRequest } from './modules/types';
import { baseBankRequest } from './modules/types';
import BankListModule from './modules';

const {
  useBanksListDispatch,
  useBanksListState,
  BANK_LIST_STATUS,
} = BankListModule;
const { createBankAccount, getBankAccounts, clearApiStatus } = Actions;
const { getAssets } = AssetsActions;

function useGetters() {
  const { status: assetsStatus, assets } = useAssetsState();
  const {
    status: bankListStatus,
    page,
    limit,
    error,
    statusCode,
  } = useBanksListState();

  const bankListDispatch = useBanksListDispatch();
  const assetsDispatch = useAssetsDispatch();

  const mountedRef = useRef(true);

  const assetsReady = ![ASSETS_STATUS.INIT].includes(assetsStatus);
  const currencies = assets
    ? assets.filter((asset) => asset.type === 'Currency')
    : [];

  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.INIT) {
      getAssets(assetsDispatch, {
        ref: mountedRef,
      });
    }

    if (bankListStatus === BANK_LIST_STATUS.INIT) {
      getBankAccounts(bankListDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
      });
    }
  }, [
    assetsStatus,
    assetsDispatch,
    bankListStatus,
    page,
    limit,
    bankListDispatch,
  ]);

  useEffect(() => {
    clearApiStatus(bankListDispatch);
  }, [mountedRef, bankListDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    bankListStatus,
    assetsReady,
    currencies,
    bankListDispatch,
    error,
    statusCode,
  };
}

export default function BankCreateComponent() {
  const { bankListStatus, bankListDispatch, statusCode, error } = useGetters();
  const history = useHistory();
  const [bank, setBank] = useState(baseBankRequest);

  const handleClickSubmit = () => {
    const payload = {
      bank,
    };

    createBankAccount(bankListDispatch, payload)
      .then(() => {
        console.log(statusCode, error);
        // setPage(bankListDispatch, { page: 0 });
        // setTimeout(() => {
        //   history.push('/accounts/banks');
        // }, 1000);
      })
      .catch();
  };

  const handleBackButton = () => {
    history.push('/accounts/banks');
  };

  const onChange = useCallback(
    (mBank: BankRequest) => {
      setBank(mBank);
    },
    [setBank]
  );

  return (
    <Grid container justify="center" alignItems="center">
      {statusCode && statusCode !== 200 && error && (
        <Box m={3} width={1}>
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Box>
      )}
      <Grid item lg={12}>
        <Grid item lg={12}>
          <Box ml={3} mt={3}>
            <Typography variant="h5">Account Info</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item lg={12}>
        <BankFormComponent onChange={onChange} />
      </Grid>
      <Grid item lg={12} container justify="center">
        <Box p={3}>
          <Box component="div" mr={2} display="inline">
            <Button color="default" onClick={handleBackButton}>
              Cancel
            </Button>
          </Box>
          <Box component="div" display="inline">
            {bankListStatus === BANK_LIST_STATUS.IDLE ? (
              <Button
                disableElevation
                variant="contained"
                color="primary"
                onClick={handleClickSubmit}
              >
                Add Bank Account
              </Button>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
