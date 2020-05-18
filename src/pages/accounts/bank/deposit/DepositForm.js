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

const useBankDepositLogic = () => {
  const [amount, setAmount] = useState<string>('');

  const handleChange = (event: { target: { name: string, value: number } }) => {
    setAmount(`${event.target.value}`);
  };

  const deposit = () => {};

  return {
    amount,
    handleChange,
    deposit,
  };
};

function BankDepositForm({
  bank,
  deposit,
}: {
  bank: Bank,
  deposit: (amount: number) => void,
}) {
  const { amount, handleChange } = useBankDepositLogic();

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
              </Box>
            </Grid>
          </Grid>
          <BankDetails bank={bank} />
          <Grid container justify="center">
            <Box mb={4}>
              <Button
                disabled={!amount}
                variant="contained"
                color="primary"
                onClick={() => deposit(parseFloat(amount))}
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

export default BankDepositForm;
