// @flow
import React, { useRef, useEffect, useState } from 'react';
import { RouteProps } from 'react-router-dom';

import { Grid, TextField, List, Typography, Box } from '@material-ui/core';
import LabelValue from 'components/LabelValue';
import { Autocomplete } from '@material-ui/lab';

import { useAssetsState, useAssetsDispatch } from 'context/assets';
import { ASSETS_STATUS } from 'context/assets/types';
import * as AssetsActions from 'context/assets/actions';
import PersonalBalancesListModule from 'context/balance/personal';

import type { UserSecurityBalance } from 'context/balance/types';

import Actions from 'context/balance/personal/actions';
import DepositList from './list';
import AssetDetails from './details';

const { setAssetType } = AssetsActions;

const {
  usePersonalBalancesListDispatch,
  usePersonalBalancesListState,
  PERSONAL_BALANCE_LIST_STATUS,
} = PersonalBalancesListModule;
const { getPersonalBalanceList, clearApiStatus, setPage } = Actions;

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

type DSState = {
  selectedCoin: ?UserSecurityBalance,
};

function useDigitalSecuritiesLogic(asset: string) {
  const { type, assetsStatus } = useGetters();
  const { items, page, pBDispatch } = useBalancesLogic();
  const [dsState, setDsState] = useState<DSState>({ selectedCoin: undefined });

  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.IDLE && type === 'Security') {
      setPage(pBDispatch, { page });
    }
  }, [type, assetsStatus, page, pBDispatch]);

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

  return {
    items,
    dsState,
    setDsState,
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
  const { items, setDsState, dsState } = useDigitalSecuritiesLogic(
    match.params.assetId
  );

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

  return (
    <Box m={4}>
      <Box mb={4}>
        <Typography variant="h3">Deposit</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid container item xs={12} sm={6} direction="column" justify="center">
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
              <TextField {...params} label="Digital Security" margin="normal" /> // eslint-disable-line
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
          {dsState.selectedCoin && (
            <AssetDetails asset={dsState.selectedCoin} />
          )}
        </Grid>
        {dsState.selectedCoin && (
          <Grid container item xs={12}>
            <Box my={2}>
              <Typography variant="h3">Recent Deposit History</Typography>
            </Box>
            <DepositList assetId={dsState.selectedCoin.assetId} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
