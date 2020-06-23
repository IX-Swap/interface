// @flow
import React, { forwardRef } from 'react'
import {
  Typography,
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import useEditableStyles from './styles'
import DsoImage from './DsoImage'

const DsoTitle = (
  {
    tokenSymbol,
    issuerName,
    edit = false,
    control: a,
    assets = [],
    children = undefined,
    updatePreview = false,
    logo,
    dsoId = ''
  }: {
    dsoId?: string,
    updatePreview?: boolean,
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
  const classesE = useEditableStyles()
  const { errors = {}, control } = useFormContext() || {}

  return (
    <Grid container alignItems='center'>
      <Box mr={2}>
        <DsoImage logo={logo} edit={updatePreview} dsoId={dsoId} />
        {children}
      </Box>
      {!edit && (
        <Grid item>
          <Typography variant='h4'>
            <b>{tokenSymbol}</b>
          </Typography>
          <Typography>{issuerName}</Typography>
        </Grid>
      )}
      {edit && (
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              label='Token Name'
              margin='normal'
              name='tokenName'
              error={errors.tokenName}
              inputRef={ref({ required: true })}
              InputLabelProps={{
                className: classesE.largeInputLabel
              }}
              InputProps={{
                className: classesE.largeInputValue
              }}
            />
            <TextField
              label='Symbol'
              margin='normal'
              name='tokenSymbol'
              error={errors.tokenSymbol}
              inputRef={ref({ required: true })}
              className={classesE.tokenSymbol}
              InputLabelProps={{
                className: classesE.largeInputLabel
              }}
              InputProps={{
                className: classesE.largeInputValue
              }}
            />

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Controller
                as={
                  <KeyboardDatePicker
                    className={classesE.launchDate}
                    margin='normal'
                    label='Launch Date'
                    autoOk
                    variant='inline'
                    format='MM/dd/yyyy'
                    views={['year', 'month', 'date']}
                    InputLabelProps={{
                      className: classesE.largeInputLabel
                    }}
                    InputProps={{
                      className: classesE.largeInputValue
                    }}
                  />
                }
                name='launchDate'
                control={control}
                onChange={(val) => {
                  // $FlowFixMe
                  control.setValue('launchDate', val[1])
                  return val[1]
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              inputRef={ref({ required: true })}
              name='issuerName'
              error={errors.issuerName}
              label='Issuer Name'
              margin='normal'
              style={{ flexGrow: 1 }}
            />
            <FormControl
              className={classesE.currency}
              margin='normal'
              error={errors.currency}
            >
              <InputLabel id='currency-selector-input'>Currency</InputLabel>
              <Controller
                error={errors.currency}
                as={
                  <Select
                    inputRef={ref}
                    name='currency'
                    error={errors.currency}
                    inputProps={{
                      name: 'currency'
                    }}
                  >
                    {(assets || []).map((e) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.symbol}
                      </MenuItem>
                    ))}
                  </Select>
                }
                name='currency'
                rules={{ required: 'this field is required' }}
                control={control}
              />
            </FormControl>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

export default forwardRef<any, any>(DsoTitle)
