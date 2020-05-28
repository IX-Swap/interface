// @flow
import React, { useState } from 'react';
import { Typography, Grid, Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useEditableStyles from './styles';

const useStyles = makeStyles(() => ({
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    backgroundColor: '#f0f0f0',
  },
}));

const DsoTitle = ({
  tokenSymbol,
  issuerName,
  edit = false,
  onChange = undefined,
}: {
  edit?: boolean,
  onChange?: (string, string) => void,
  tokenSymbol: string,
  issuerName: string,
}) => {
  const classes = useStyles();
  const classesE = useEditableStyles();
  const [values, setValues] = useState({
    symbol: tokenSymbol,
    issuer: issuerName,
  });

  return (
    <Grid container alignItems="center">
      <Box mr={2}>
        <div className={classes.logo} />
      </Box>
      {!edit && (
        <Grid item direction="column">
          <Typography variant="h4">
            <b>{tokenSymbol}</b>
          </Typography>
          <Typography>{issuerName}</Typography>
        </Grid>
      )}
      {edit && (
        <Grid item direction="column" style={{ display: 'flex' }}>
          <TextField
            label="Token Symbol"
            margin="normal"
            value={values.symbol}
            onChange={(ev) => {
              setValues({
                ...values,
                symbol: ev.target.value,
              });
              onChange(ev.target.value, values.issuer);
            }}
            InputLabelProps={{
              className: classesE.largeInputLabel,
            }}
            InputProps={{
              className: classesE.largeInputValue,
            }}
          />
          <TextField
            value={values.issuer}
            onChange={(ev) => {
              setValues({
                ...values,
                issuer: ev.target.value,
              });
              onChange(values.symbol, ev.target.value);
            }}
            label="Issuer Name"
            margin="normal"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default DsoTitle;
