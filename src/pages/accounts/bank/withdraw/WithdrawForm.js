// @flow
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  FormControl,
  Grid,
  TextField,
  Box,
  Typography,
  Button,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import type { Bank } from '../modules/types';
import BankDetails from './BankDetails';

const NumberFormatCustom = ({ symbol, inputRef, onChange, ...others }: any) => (
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

const useBankWithdrawLogic = () => {
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');

  const handleChange = (event: { target: { name: string, value: number } }) => {
    setAmount(`${event.target.value}`);
  };

  const handleMemoChange = (event: {
    target: { name: string, value: string },
  }) => {
    setMemo(event.target.value);
  };

  const withdraw = () => {};

  return {
    memo,
    handleMemoChange,
    amount,
    handleChange,
    withdraw,
  };
};

function BankWithdrawForm({
  bank,
  withdraw,
  available,
}: {
  available: number,
  bank: Bank,
  withdraw: (amount: number, memo: string) => void,
}) {
  const {
    amount,
    handleChange,
    memo,
    handleMemoChange,
  } = useBankWithdrawLogic();

  return (
    <>
      {bank && (
        <>
          <Grid container direction="column" justify="center">
            <Grid item container justify="center">
              <FormControl>
                <TextField
                  label="Amount"
                  autoComplete="off"
                  value={amount}
                  onChange={handleChange}
                  name="numberformat"
                  id="formatted-numberformat-input"
                  inputProps={{
                    symbol: bank.asset.symbol,
                  }}
                  // this is not duplicate
                  // eslint-disable-next-line
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
                <Typography variant="caption">
                  Transaction fees may apply
                </Typography>
              </FormControl>
            </Grid>
            <Grid item container justify="center">
              <Box mt={2}>
                <FormControl>
                  <TextField
                    label="Memo"
                    name="memo"
                    onChange={handleMemoChange}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <BankDetails bank={bank} />
          </Grid>
          <Grid container justify="center">
            <Box mb={4}>
              <Button
                disabled={!amount || amount > available}
                variant="contained"
                color="primary"
                onClick={() => withdraw(parseFloat(amount), memo)}
              >
                Continue
              </Button>
            </Box>
          </Grid>
        </>
      )}
    </>
  );
}

export default BankWithdrawForm;
