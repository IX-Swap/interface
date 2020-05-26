// @flow
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RouteProps } from 'react-router-dom';

import {
  Grid,
  TextField,
  List,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import LabelValue from 'components/LabelValue';
import { Autocomplete } from '@material-ui/lab';
import { ButtonWithLoading, snackbarService } from 'uno-material-ui';
import moment from 'moment';

import { useAssetsState, useAssetsDispatch } from 'context/assets';
import { ASSETS_STATUS } from 'context/assets/types';
import * as AssetsActions from 'context/assets/actions';
import PersonalBalancesListModule from 'context/balance/personal';

import type { UserSecurityBalance } from 'context/balance/types';

import Actions from 'context/balance/personal/actions';
import WithdrawalList from './list';
import WithdrawalDetailsInput from './details';
import DSWithdrawalConfirmation from './confirmation';

import WithdrawalModule from './modules';
import WithdrawalActions, { withdraw } from './modules/actions';

import type { DSState, TransferDetails } from '../modules/types';

const { setAssetType } = AssetsActions;

const {
  usePersonalBalancesListDispatch,
  usePersonalBalancesListState,
  PERSONAL_BALANCE_LIST_STATUS,
} = PersonalBalancesListModule;
const { getPersonalBalanceList, clearApiStatus, setPage } = Actions;

const { useDSWithdrawalsListDispatch } = WithdrawalModule;
const { setPage: setWithdrawalsPage } = WithdrawalActions;

const useBalancesLogic = () => {
  const mountedRef = useRef(true);
  const pBDispatch = usePersonalBalancesListDispatch();
  const { status, page, limit, items } = usePersonalBalancesListState();

  useEffect(() => {
    if (status === PERSONAL_BALANCE_LIST_STATUS.INIT) {
      getPersonalBalanceList(pBDispatch, {
        skip: page * limit,
        limit,
        ref: mountedRef,
        type: 'Security',
      });
      clearApiStatus(pBDispatch);
    }
  }, [page, limit, status, pBDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    items,
    page,
    pBDispatch,
  };
};

function useGetters() {
  const mountedRef = useRef(true);
  const { status: assetsStatus, type } = useAssetsState();
  const aDispatch = useAssetsDispatch();

  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.INIT || type !== 'Security') {
      setAssetType(aDispatch, { ref: mountedRef, type: 'Security' });
    }
  }, [aDispatch, assetsStatus, type]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    type,
    assetsStatus,
  };
}

const baseTransferDetails = {
  recipientWallet: '',
  amount: '',
  memo: '',
  otp: '',
  date: '',
};

const withdrawalInitialState = {
  isConfirmation: false,
  isSaving: false,
  otp: '',
};

function useDigitalSecuritiesLogic(asset: string) {
  const { type, assetsStatus } = useGetters();
  const { items, page, pBDispatch } = useBalancesLogic();
  const withdrawalListDispatch = useDSWithdrawalsListDispatch();
  const [dsState, setDsState] = useState<DSState>({ selectedCoin: undefined });
  const [withdrawalState, setWithdrawalState] = useState({
    ...withdrawalInitialState,
  });
  const [transferDetails, setTransferDetails] = useState<TransferDetails>({
    asset,
    ...baseTransferDetails,
  });

  if (
    !dsState.selectedCoin ||
    (dsState.selectedCoin && dsState.selectedCoin.assetId !== asset)
  ) {
    const filtered = items.filter((e) => e.assetId === asset);

    if (filtered.length) {
      setDsState({
        ...dsState,
        selectedCoin: filtered[0],
      });
    }
  }

  const itemsChanged = useCallback(() => {
    const filtered = items.filter((e) => e.assetId === asset);

    if (filtered.length) {
      setDsState({
        // ...dsState,
        selectedCoin: filtered[0],
      });
    }
  }, [items, setDsState, asset]);

  useEffect(() => {
    console.log('effect');
    itemsChanged();
  }, [itemsChanged]);

  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.IDLE && type === 'Security') {
      setPage(pBDispatch, { page });
    }
  }, [type, assetsStatus, page, pBDispatch]);

  const onConfirmClicked = async () => {
    const isSuccess = await withdraw(transferDetails);
    const snackbarDetails = {
      type: 'error',
      message: 'Unable to withdraw, please check your OTP and/or balance',
    };

    if (isSuccess) {
      const coin = dsState.selectedCoin ? dsState.selectedCoin?.symbol : '';
      snackbarDetails.type = 'success';
      snackbarDetails.message = `Successfully withdrawn ${transferDetails.amount} ${coin}`;

      setPage(pBDispatch, { page });
      setTransferDetails({
        asset,
        ...baseTransferDetails,
      });

      setWithdrawalState({
        ...withdrawalInitialState,
      });

      setWithdrawalsPage(withdrawalListDispatch, { page: 1 });
    }

    snackbarService.showSnackbar(snackbarDetails.message, snackbarDetails.type);
  };

  return {
    items,
    dsState,
    setDsState,
    transferDetails,
    setTransferDetails,
    withdrawalState,
    setWithdrawalState,
    onConfirmClicked,
  };
}

const balanceValues = [
  {
    label: 'Total Balance:',
    value: (ds: UserSecurityBalance) => ds.balance,
  },
  {
    label: 'On Hold Balance:',
    value: (ds: UserSecurityBalance) => ds.onHold,
  },
  {
    label: 'Available Balance:',
    value: (ds: UserSecurityBalance) => ds.available,
  },
];

export default function DigitalSecurities({ match }: RouteProps) {
  const {
    items,
    setDsState,
    dsState,
    withdrawalState,
    setWithdrawalState,
    transferDetails,
    setTransferDetails,
    onConfirmClicked,
  } = useDigitalSecuritiesLogic(match.params.assetId);

  const setDetails = (key: $Keys<TransferDetails>, value: string) => {
    const details = {
      ...transferDetails,
    };
    details[key] = value;

    setTransferDetails(details);
  };

  const resetDetails = () => {
    setTransferDetails({
      ...transferDetails,
      ...baseTransferDetails,
    });
  };

  const isSelected = (
    option: UserSecurityBalance,
    value: UserSecurityBalance
  ) => option.assetId === value.assetId;

  const onCoinChange = (ev, value: UserSecurityBalance) => {
    setDsState({
      ...dsState,
      selectedCoin: value,
    });
  };

  const detailsView = !withdrawalState.isConfirmation ? (
    <>
      <WithdrawalDetailsInput
        asset={dsState.selectedCoin}
        transferDetails={transferDetails}
        setTransferDetails={setDetails}
      />
      <Grid container my={2} justify="center" spacing={2}>
        <Grid item>
          <Button color="default" onClick={() => resetDetails()}>
            Reset
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={
              !transferDetails.amount ||
              !transferDetails.memo ||
              !transferDetails.recipientWallet
            }
            variant="contained"
            color="primary"
            onClick={() => {
              setDetails(
                'date',
                moment(new Date()).format('MM/DD/YYYY hh:mm:ss a')
              );
              setWithdrawalState({
                ...withdrawalState,
                isConfirmation: true,
              });
            }}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </>
  ) : (
    <>
      <DSWithdrawalConfirmation
        asset={dsState.selectedCoin}
        transferDetails={transferDetails}
      />
      <Grid container justify="center">
        <Box my={4} alignSelf="center">
          <TextField
            id="two-fa"
            label="2-Factor Auth Code"
            variant="outlined"
            onChange={(ev) =>
              setTransferDetails({ ...transferDetails, otp: ev.target.value })
            }
          />
        </Box>
      </Grid>
      <Grid container justify="center">
        <Box component="div" mr={2} mb={4} display="inline">
          <Button
            color="default"
            onClick={() =>
              setWithdrawalState({
                ...withdrawalState,
                isConfirmation: false,
              })
            }
          >
            Cancel
          </Button>
        </Box>
        <Box mb={4}>
          <ButtonWithLoading
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => onConfirmClicked()}
          >
            Confirm Withdraw
          </ButtonWithLoading>
        </Box>
      </Grid>
    </>
  );

  return (
    <Box m={4}>
      <Grid container spacing={3}>
        <Grid container item xs={12} sm={6} direction="column" justify="center">
          <Box mb={4}>
            <Typography variant="h3">Withdrawal</Typography>
          </Box>
          <Autocomplete
            disabled
            options={items}
            value={dsState.selectedCoin || {}}
            getOptionSelected={isSelected}
            getOptionLabel={(option: UserSecurityBalance) =>
              `${option.name} (${option.symbol})`
            }
            id="coin"
            onChange={onCoinChange}
            renderInput={(params) => (
              <TextField {...params} label="Coin" margin="normal" /> // eslint-disable-line
            )}
          />
          {dsState.selectedCoin && (
            <List dense>
              {balanceValues.map((row, index) => (
                <LabelValue
                  key={index}
                  label={row.label}
                  value={row.value(dsState.selectedCoin)}
                />
              ))}
            </List>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {dsState.selectedCoin && detailsView}
        </Grid>
        {dsState.selectedCoin && (
          <Grid container item xs={12}>
            <Box my={2}>
              <Typography variant="h3">Recent Withdrawal History</Typography>
            </Box>
            <WithdrawalList assetId={dsState.selectedCoin.assetId} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
