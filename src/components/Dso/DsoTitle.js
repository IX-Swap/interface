// @flow
import React, { forwardRef } from 'react';
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

const DsoTitle = (
  {
    tokenSymbol,
    issuerName,
    edit = false,
    onChange = undefined,
  }: {
    edit?: boolean,
    onChange?: (string, string) => void,
    tokenSymbol: string,
    issuerName: string,
  },
  ref: any
) => {
  const classes = useStyles();
  const classesE = useEditableStyles();

  return (
    <Grid container alignItems="center">
      <Box mr={2}>
        <div className={classes.logo} />
      </Box>
      {!edit && (
        <Grid item>
          <Typography variant="h4">
            <b>{tokenSymbol}</b>
          </Typography>
          <Typography>{issuerName}</Typography>
        </Grid>
      )}
      {edit && (
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              label="Token Name"
              margin="normal"
              name="tokenName"
              inputRef={ref}
              InputLabelProps={{
                className: classesE.largeInputLabel,
              }}
              InputProps={{
                className: classesE.largeInputValue,
              }}
            />
            <TextField
              label="Symbol"
              margin="normal"
              name="tokenSymbol"
              inputRef={ref}
              className={classesE.tokenSymbol}
              InputLabelProps={{
                className: classesE.largeInputLabel,
              }}
              InputProps={{
                className: classesE.largeInputValue,
              }}
            />
          </Grid>
          <TextField
            inputRef={ref}
            name="issuerName"
            label="Issuer Name"
            margin="normal"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default forwardRef<any, any>(DsoTitle);
