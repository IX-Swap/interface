// @flow
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { snackbarService } from 'uno-material-ui';
import { useAssetsState, useAssetsDispatch } from 'context/assets';
import { ASSETS_STATUS } from 'context/assets/types';
import type { Asset } from 'context/assets/types';
import * as AssetsActions from 'context/assets/actions';
import BankFormComponent from './BankFormComponent';

import Actions from './modules/actions';
import type { BankRequest } from './modules/types';
import { baseBankRequest, bankSaveStatus } from './modules/types';
import BankListModule from './modules';
import BankViewComponent from './view';

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

  if (assetsStatus === ASSETS_STATUS.INIT) {
    getAssets(assetsDispatch, {
      ref: mountedRef,
    });
  }

  useEffect(() => {
    if (bankListStatus === BANK_LIST_STATUS.INIT) {
      setPage(bankListDispatch, { page });
    }

    if (bankListStatus === BANK_LIST_STATUS.IDLE && isSaving) {
      let message = 'Failed to add bank account';
      let type = 'error';

      setIsSaving(false);
      setPage(bankListDispatch, { page });
      if (!error && statusCode === 200) {
        goBack(true);
        message = 'Successfully added bank account';
        type = 'success';
      }

      snackbarService.showSnackbar(message, type);
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
    error,
    statusCode,
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

const BankCreateComponent = ({
  bankListStatus,
  statusCode,
  error,
  bank,
  goBack,
  setIsConfirmation,
  setBank,
}: any) => {
  const [isValidForm, setIsValidForm] = useState(false);
  const handleClickSubmit = () => {
    setIsConfirmation(true);
  };

  const handleBackButton = () => {
    goBack(false);
  };

  const onChange = useCallback(
    (mBank: BankRequest, result: boolean) => {
      setBank(mBank);
      setIsValidForm(result);
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
        <BankFormComponent bank={bank} onChange={onChange} />
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
                disabled={!isValidForm}
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
};

const BankConfirmationComponent = ({
  bank,
  asset,
  bankListStatus,
  submit,
  cancel,
}: {
  bank: BankRequest,
  asset: Asset,
  submit: Function,
  cancel: Function,
  bankListStatus: string,
}) => (
  <Container>
    <Box m={4}>
      <Grid container justify="center" spacing={4}>
        <Grid item xs={12}>
          <Typography align="center">
            You are now going to add this bank account. Please check the details
            before you confirm or click on the back button to edit.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box
            p={2}
            border={1}
            borderRadius={5}
            borderColor="grey.300"
            maxWidth={1000}
          >
            <BankViewComponent bank={bank} asset={asset} />
          </Box>
        </Grid>
        <Grid item lg={12} container justify="center">
          <Box p={3}>
            <Box component="div" mr={2} display="inline">
              <Button color="default" onClick={cancel}>
                Cancel
              </Button>
            </Box>
            <Box component="div" display="inline">
              {bankListStatus !== bankSaveStatus.BANK_SAVING ? (
                <Button
                  disableElevation
                  variant="contained"
                  color="primary"
                  onClick={submit}
                >
                  Confirm
                </Button>
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Container>
);

const BankCreateHolder = () => {
  const [isConfirmation, setIsConfirmation] = useState(false);
  const {
    bankListStatus,
    bankListDispatch,
    statusCode,
    currencies,
    error,
    goBack,
  } = useGetters();
  const [bank, setBank] = useState(baseBankRequest);
  const [asset, setAsset] = useState(currencies[0]);

  const mSetBank = useCallback((mBank: BankRequest) => {
    setBank(mBank);
    const mAsset = currencies.filter((e) => e._id === mBank.asset);
    if (mAsset.length) {
      // $FlowFixMe
      setAsset(mAsset[0]);
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmitBank = () => {
    const payload = {
      bank,
    };

    createBankAccount(bankListDispatch, payload);
  };

  let toRender = (
    <BankCreateComponent
      bank={bank}
      bankListStatus={bankListStatus}
      statusCode={statusCode}
      error={error}
      goBack={goBack}
      setIsConfirmation={setIsConfirmation}
      setBank={mSetBank}
    />
  );

  if (isConfirmation) {
    toRender = (
      <BankConfirmationComponent
        asset={asset}
        bank={bank}
        bankListStatus={bankListStatus}
        submit={handleSubmitBank}
        cancel={() => setIsConfirmation(false)}
      />
    );
  }

  return toRender;
};

export default BankCreateHolder;
