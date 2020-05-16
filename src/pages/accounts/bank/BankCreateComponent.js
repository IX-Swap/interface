// @flow
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@material-ui/core';
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
const { createBankAccount, getBankAccounts, setPage } = Actions;
const { getAssets } = AssetsActions;

function useGetters() {
  const { status: assetsStatus, assets } = useAssetsState();
  const { status: bankListStatus, page, limit } = useBanksListState();

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

  return {
    bankListStatus,
    assetsReady,
    currencies,
    bankListDispatch,
  };
}

export default function BankCreateComponent() {
  const { bankListStatus, bankListDispatch } = useGetters();
  const history = useHistory();
  const [bank, setBank] = useState(baseBankRequest);

  const handleClickSubmit = () => {
    const payload = {
      userId: '5ebcf457d67958b03c7caa87',
      bank,
    };

    createBankAccount(bankListDispatch, payload)
      .then(() => {
        setPage(bankListDispatch, { page: 0 });
        setTimeout(() => {
          history.push('/accounts');
        }, 1000);
      })
      .catch();
  };

  const handleBackButton = () => {
    history.push('/accounts');
  };

  const onChange = useCallback(
    (mBank: BankRequest) => {
      setBank(mBank);
    },
    [setBank]
  );

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item lg={9}>
        <Grid item sm={12} md={12} lg={12}>
          <Box pl={0} p={3}>
            <Typography variant="h3">Setup Bank Account</Typography>
          </Box>
        </Grid>
        <Paper>
          <Grid container>
            <Grid item lg={12}>
              <Box ml={3} mt={3}>
                <Typography variant="h5">Account Info</Typography>
              </Box>
            </Grid>
            <BankFormComponent onChange={onChange} />
            <Grid item>
              <Box p={3}>
                <Box component="div" mr={3} display="inline">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBackButton}
                  >
                    Cancel
                  </Button>
                </Box>
                <Box component="div" display="inline">
                  {bankListStatus === BANK_LIST_STATUS.IDLE ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleClickSubmit}
                    >
                      Submit
                    </Button>
                  ) : (
                    <CircularProgress />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
