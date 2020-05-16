// @flow
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
  Paper,
} from '@material-ui/core';

import { useAssetsDispatch, useAssetsState } from 'context/assets';
import { getAssets } from 'context/assets/actions';
import { ASSETS_STATUS } from 'context/assets/types';

import BankListModule from './modules';
import Actions from './modules/actions';

const {
  useBanksListDispatch,
  useBanksListState,
  BANK_LIST_STATUS,
} = BankListModule;
const { getBankAccounts } = Actions;

function useBankCreateLogic() {
  const assetsDispatch = useAssetsDispatch();
  const bankListDispatch = useBanksListDispatch();
  const [symbol, setSymbol] = useState('');
  const { status: assetsStatus, assets } = useAssetsState();
  const { status: bankListStatus } = useBanksListState();
  const mountedRef = useRef(true);

  const assetsReady = ![ASSETS_STATUS.INIT].includes(assetsStatus);

  const getBankList = () =>
    getBankAccounts(bankListDispatch, {
      ref: mountedRef,
    });

  useEffect(() => {
    if (assetsStatus === ASSETS_STATUS.INIT) {
      getAssets(assetsDispatch, {
        ref: mountedRef,
      });
    }

    if (bankListStatus === BANK_LIST_STATUS.INIT) {
      getBankAccounts(bankListDispatch, {
        ref: mountedRef,
      });
    }
  }, [assetsStatus, assetsDispatch, bankListStatus, bankListDispatch]);

  const currencies = assets
    ? assets.filter((asset) => asset.type === 'Currency')
    : [];

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
    currencies,
    assetsReady,
    getBankList,
    bankListStatus,
    handleSelectChange,
    symbol,
  };
}

export default function BankCreateComponent() {
  const {
    currencies,
    assetsReady,
    getBankList,
    bankListStatus,
    handleSelectChange,
    symbol,
  } = useBankCreateLogic();

  const history = useHistory();
  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAddress, setBankAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [bankAccountHolderName, setBankAccountHolderName] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');

  const handleClickSubmit = () => {
    const payload = {
      userId: null,
      bankName: bankAccountName,
      bankAddress,
      accountHolderName: bankAccountHolderName,
      swiftCode,
      bankAccountNumber,
      assetId: symbol,
    };

    console.log('will create', payload);
    // createBankAccount(bankDispatch, payload)
    //  .then(() => {
    getBankList();
    //   setTimeout(() => {
    //     history.push('/accounts');
    //   }, 1000);
    // })
    // .catch(); */
  };

  const handleBackButton = () => {
    history.push('/accounts');
  };

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
            <Grid item sm={12} md={12} lg={6}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="bank-name">Bank Name</InputLabel>
                  <Input
                    id="bank-name"
                    onChange={(e) => {
                      setBankAccountName(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={5}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="account-holder-name-input">
                    Account Holder Name
                  </InputLabel>
                  <Input
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
            <Grid item sm={12} md={12} lg={5}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="bank-account-number-input">
                    Bank Account Number
                  </InputLabel>

                  <Input
                    id="bank-account-number-input"
                    type="number"
                    onChange={(e) => {
                      setBankAccountNumber(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={3}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="swift-code-input">Swift Code</InputLabel>
                  <Input
                    id="swift-code-input"
                    type="number"
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
                  <InputLabel htmlFor="bank-address-line1-input">
                    Line 1
                  </InputLabel>
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
            <Grid item sm={12} md={12} lg={5}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="bank-address-line2-input">
                    Line 2
                  </InputLabel>
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
                  <InputLabel htmlFor="bank-address-city-input">
                    City
                  </InputLabel>
                  <Input
                    id="bank-address-city-input"
                    onChange={(e) => {
                      setBankAddress({ ...bankAddress, city: e.target.value });
                    }}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item sm={12} md={12} lg={5}>
              <Box ml={3} m={1}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="bank-address-state-input">
                    State
                  </InputLabel>
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
              <Grid item sm={12} md={12} lg={5}>
                <Box ml={3} m={1}>
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
        </Paper>
      </Grid>
    </Grid>
  );
}
