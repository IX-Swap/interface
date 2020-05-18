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
import { baseBankRequest, bankSaveStatus } from './modules/types';
import BankListModule from './modules';

const {
  useBanksListDispatch,
  useBanksListState,
  BANK_LIST_STATUS,
} = BankListModule;
const { createBankAccount, clearApiStatus, setPage } = Actions;
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
  const history = useHistory();
  const bankListDispatch = useBanksListDispatch();
  const assetsDispatch = useAssetsDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const mountedRef = useRef(true);

  const assetsReady = ![ASSETS_STATUS.INIT].includes(assetsStatus);
  const currencies = assets
    ? assets.filter((asset) => asset.type === 'Currency')
    : [];

  const goBack = useCallback(
    (isSaved: boolean) => {
      history.push({
        pathname: '/accounts/banks',
        state: {
          savedBank: isSaved,
        },
      });
    },
    [history]
  );

  useEffect(() => {
    console.log('effect called', bankListStatus);
    if (assetsStatus === ASSETS_STATUS.INIT) {
      getAssets(assetsDispatch, {
        ref: mountedRef,
      });
    }

    if (bankListStatus === BANK_LIST_STATUS.INIT) {
      setPage(bankListDispatch, { page });
    }

    if (bankListStatus === BANK_LIST_STATUS.IDLE && isSaving) {
      setIsSaving(false);
      setPage(bankListDispatch, { page });
      goBack(true);
    }

    if (bankListStatus === bankSaveStatus.BANK_SAVING) {
      setIsSaving(true);
    }
  }, [
    goBack,
    assetsStatus,
    assetsDispatch,
    bankListStatus,
    isSaving,
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
    page,
    statusCode,
    goBack,
  };
}

export default function BankCreateComponent() {
  const {
    bankListStatus,
    bankListDispatch,
    statusCode,
    error,
    goBack,
  } = useGetters();
  const [bank, setBank] = useState(baseBankRequest);

  const handleClickSubmit = () => {
    const payload = {
      bank,
    };

    createBankAccount(bankListDispatch, payload);
  };

  const handleBackButton = () => {
    goBack(false);
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
            {bankListStatus !== bankSaveStatus.BANK_SAVING ? (
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
