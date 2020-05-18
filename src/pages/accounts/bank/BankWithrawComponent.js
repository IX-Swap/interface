// @flow
/* eslint-disable react/jsx-props-no-spreading, react/jsx-no-duplicate-props */
import React, { useCallback, useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import RouteProps from 'react-router-dom';

import {
  Paper,
  FormControl,
  Grid,
  TextField,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import BankActions from './modules/actions';
import BanksListModule from './modules/index';

import type { Bank } from './modules/types';

const { getBank } = BankActions;
const { useBanksListDispatch } = BanksListModule;

const BankDetails = ({ bank }: { bank: Bank }) => (
  <Box m={4}>
    <Paper>
      <Box px={4} py={2}>
        <p>
          <b>{bank.bankName}</b>
        </p>
        <p>
          <b>Swift:</b>
          &nbsp;{bank.swiftCode}
        </p>
        <p>
          <b>Account:</b>
          &nbsp;{bank.accountHolderName}
        </p>
        <p>
          <b>Account Number:</b>
          &nbsp;{bank.bankAccountNumber}
        </p>
        <p>
          <b>Voucher Code:</b>
          &nbsp;Where to get?
        </p>
      </Box>
    </Paper>
  </Box>
);

const NumberFormatCustom = ({ symbol, inputRef, onChange, ...others }: any) => {
  console.log('others', others);
  return (
    <NumberFormat
      thousandSeparator
      {...others}
      allowEmptyFormatting
      inputMode="numeric"
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: others.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      prefix={`${symbol}  `}
    />
  );
};

function BankWithrawComponent({ match }: RouteProps) {
  const { bankId } = match.params;
  const dispatch = useBanksListDispatch();
  const [bank, setBank] = useState<Bank | null>(null);
  const [amount, setAmount] = useState({
    numberformat: '',
  });
  const mountedRef = useRef(true);

  const getBankData = useCallback(
    async (bId: string) => {
      const bankData = await getBank(dispatch, { bankId: bId });
      if (!mountedRef.current) return;

      setBank(bankData);
    },
    [dispatch]
  );

  const handleChange = (event: { target: { name: string, value: number } }) => {
    setAmount({
      numberformat: event.target.value,
    });
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

  return (
    <>
      {bank && (
        <>
          <Grid container justify="center">
            <Grid item sm={12} md={12} lg={3}>
              <Box mt={4}>
                <FormControl fullWidth>
                  <TextField
                    label="Amount"
                    value={amount.numberformat}
                    onChange={handleChange}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    inputProps={{
                      symbol: bank.asset.symbol,
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <Typography variant="caption">
                    Transaction fees may apply
                  </Typography>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <BankDetails bank={bank} />
          <Grid container justify="center">
            <Box mb={4}>
              <Button variant="contained" color="primary">
                Confirm Withraw
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </>
  );
}

export default BankWithrawComponent;
