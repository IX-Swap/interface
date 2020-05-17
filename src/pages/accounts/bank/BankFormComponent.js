// @flow
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Typography,
  MenuItem,
  Select,
  Paper,
} from '@material-ui/core';

import { useAssetsDispatch, useAssetsState } from 'context/assets';
import { getAssets } from 'context/assets/actions';
import { ASSETS_STATUS } from 'context/assets/types';

import type { BankRequest } from './modules/types';

function useGetters() {
  const { status: assetsStatus, assets } = useAssetsState();

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
  }, [assetsStatus, assetsDispatch]);

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    assetsReady,
    currencies,
  };
}

function useBankFormLogic(bank?: BankRequest) {
  const [symbol, setSymbol] = useState(bank?.asset || '');
  const mountedRef = useRef(true);

  const [bankAccountName, setBankAccountName] = useState(bank?.bankName || '');
  const [bankAddress, setBankAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [bankAccountHolderName, setBankAccountHolderName] = useState(
    bank?.accountHolderName || ''
  );
  const [swiftCode, setSwiftCode] = useState(bank?.swiftCode || '');
  const [bankAccountNumber, setBankAccountNumber] = useState(
    bank?.bankAccountNumber || ''
  );

  const handleSelectChange = (ev) => {
    ev.preventDefault();
    setSymbol(ev.target.value);
  };

  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  return {
    symbol,
    handleSelectChange,
    bankAccountName,
    setBankAccountName,
    bankAddress,
    setBankAddress,
    bankAccountHolderName,
    setBankAccountHolderName,
    swiftCode,
    setSwiftCode,
    bankAccountNumber,
    setBankAccountNumber,
  };
}

type BankFormComponentProps = {
  bank?: BankRequest,
  onChange: (bank: BankRequest) => void,
};

export default function BankFormComponent({
  bank,
  onChange,
}: BankFormComponentProps) {
  const {
    symbol,
    handleSelectChange,
    bankAccountName,
    setBankAccountName,
    bankAddress,
    setBankAddress,
    bankAccountHolderName,
    setBankAccountHolderName,
    swiftCode,
    setSwiftCode,
    bankAccountNumber,
    setBankAccountNumber,
  } = useBankFormLogic(bank);

  const { assetsReady, currencies } = useGetters();

  const onChangeCallback = useCallback(
    (mBank: BankRequest) => {
      onChange(mBank);
    },
    [onChange]
  );

  useEffect(() => {
    onChangeCallback({
      accountHolderName: bankAccountHolderName,
      bankName: bankAccountName,
      bankAccountNumber,
      asset: symbol,
      swiftCode,
    });
  }, [
    bankAccountHolderName,
    bankAccountName,
    bankAccountNumber,
    symbol,
    swiftCode,
    onChangeCallback,
  ]);

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item sm={12} md={12} lg={6}>
          <Box ml={3} m={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="bank-name">Bank Name</InputLabel>
              <Input
                defaultValue={bankAccountName}
                id="bank-name"
                onChange={(e) => {
                  setBankAccountName(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box mr={3} m={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="account-holder-name-input">
                Account Holder Name
              </InputLabel>
              <Input
                defaultValue={bankAccountHolderName}
                id="account-holder-name-input"
                onChange={(e) => {
                  setBankAccountHolderName(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item sm={12} md={12} lg={3}>
          <Box ml={3} m={1}>
            <FormControl fullWidth>
              <InputLabel id="currency-selector-input">Currency</InputLabel>
              <Select
                fullWidth
                labelId="currency-selector"
                id="currency-selector-value"
                value={symbol}
                onChange={handleSelectChange}
              >
                {assetsReady
                  ? currencies.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.symbol}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box ml={3} m={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="bank-account-number-input">
                Bank Account Number
              </InputLabel>

              <Input
                id="bank-account-number-input"
                type="number"
                defaultValue={bankAccountNumber}
                onChange={(e) => {
                  setBankAccountNumber(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={3}>
          <Box mr={3} m={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="swift-code-input">Swift Code</InputLabel>
              <Input
                id="swift-code-input"
                type="number"
                defaultValue={swiftCode}
                onChange={(e) => {
                  setSwiftCode(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12} md={12} lg={12}>
          <Box ml={3} mt={3}>
            <Typography variant="h5">Bank Address</Typography>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box ml={3} m={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="bank-address-line1-input">Line 1</InputLabel>
              <Input
                id="bank-address-line1-input"
                onChange={(e) => {
                  setBankAddress({
                    ...bankAddress,
                    line1: e.target.value,
                  });
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box mr={3} m={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="bank-address-line2-input">Line 2</InputLabel>
              <Input
                id="bank-address-line2-input"
                onChange={(e) => {
                  setBankAddress({
                    ...bankAddress,
                    line2: e.target.value,
                  });
                }}
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item sm={12} md={12} lg={6}>
          <Box ml={3} m={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="bank-address-city-input">City</InputLabel>
              <Input
                id="bank-address-city-input"
                onChange={(e) => {
                  setBankAddress({
                    ...bankAddress,
                    city: e.target.value,
                  });
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid item sm={12} md={12} lg={6}>
          <Box mr={3} m={1}>
            <FormControl fullWidth>
              <InputLabel htmlFor="bank-address-state-input">State</InputLabel>
              <Input
                id="bank-address-state-input"
                onChange={(e) => {
                  setBankAddress({
                    ...bankAddress,
                    state: e.target.value,
                  });
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Grid container>
          <Grid item sm={12} md={12} lg={6}>
            <Box ml={3} m={1}>
              <FormControl fullWidth>
                <InputLabel htmlFor="bank-address-country-input">
                  Country
                </InputLabel>
                <Input
                  id="bank-address-country-input"
                  onChange={(e) => {
                    setBankAddress({
                      ...bankAddress,
                      country: e.target.value,
                    });
                  }}
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={12} md={12} lg={6}>
            <Box mr={3} m={1}>
              <FormControl fullWidth>
                <InputLabel htmlFor="bank-address-postal-code-input">
                  Postal Code
                </InputLabel>
                <Input
                  id="bank-address-postalcode-input"
                  onChange={(e) => {
                    setBankAddress({
                      ...bankAddress,
                      postalCode: e.target.value,
                    });
                  }}
                />
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
