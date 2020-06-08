// @flow
import React, { forwardRef } from 'react';
import {
  Typography,
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { Controller } from 'react-hook-form';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import useEditableStyles from './styles';
import DsoImage from './DsoImage';

const DsoTitle = (
  {
    tokenSymbol,
    issuerName,
    edit = false,
    control,
    assets = [],
    children = undefined,
    logo,
    dsoId = '',
  }: {
    dsoId?: string,
    logo?: string,
    children: any,
    assets: Array<any>,
    control?: any,
    edit?: boolean,
    tokenSymbol: string,
    issuerName: string,
  },
  ref: any
) => {
  const classesE = useEditableStyles();

  return (
    <Grid container alignItems="center">
      <Box mr={2}>
        <DsoImage logo={logo} edit={edit} dsoId={dsoId} />
        {children}
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

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                as={
                  <KeyboardDatePicker
                    className={classesE.launchDate}
                    margin="normal"
                    label="Launch Date"
                    autoOk
                    variant="inline"
                    format="MM/dd/yyyy"
                    views={['year', 'month', 'date']}
                    InputLabelProps={{
                      className: classesE.largeInputLabel,
                    }}
                    InputProps={{
                      className: classesE.largeInputValue,
                    }}
                  />
                }
                name="launchDate"
                control={control}
                onChange={(val) => {
                  // $FlowFixMe
                  control.setValue('launchDate', val[1]);
                  return val[1];
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              inputRef={ref}
              name="issuerName"
              label="Issuer Name"
              margin="normal"
              style={{ flexGrow: 1 }}
            />
            <FormControl className={classesE.currency} margin="normal">
              <InputLabel id="currency-selector-input">Currency</InputLabel>
              <Controller
                as={
                  <Select
                    inputRef={ref}
                    name="currency"
                    inputProps={{
                      name: 'currency',
                    }}
                  >
                    {(assets || []).map((e) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.symbol}
                      </MenuItem>
                    ))}
                  </Select>
                }
                name="currency"
                control={control}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default forwardRef<any, any>(DsoTitle);
