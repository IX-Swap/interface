import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Controller, useFormContext } from 'react-hook-form'
import AssetsSelect from '../../components/assets-select'
import NumberFormat from 'react-number-format'
import { noop } from 'lodash'

const NumberFormatCustom = ({ ...others }: any) => {
  return (
    <NumberFormat
      decimalScale={2}
      thousandSeparator
      {...others}
      allowEmptyFormatting
      inputMode='numeric'
      isNumericString
      onChange={noop}
      onValueChange={e => {
        others.onChange(e.value)
      }}
    />
  )
}

const DepositForm = () => {
  const methods = useFormContext()
  const asset = methods.watch('asset')
  const watch = methods.watch('amount')

  return (
    <form>
      <Grid container justify='center' spacing={2}>
        <Grid item>
          <AssetsSelect fullWidth={false} required />
        </Grid>
        {asset && (
          <Grid item>
            <Controller
              name='amount'
              control={methods.control}
              as={
                <TextField
                  error={!!methods.errors.amount}
                  label='Amount'
                  required
                  style={{ marginBottom: '1em' }}
                  InputProps={{
                    inputComponent: NumberFormatCustom
                  }}
                  helperText='Transaction fees may apply'
                />
              }
              InputLabelProps={{
                shrink: !!watch
              }}
              rules={{
                required: 'required'
              }}
              onChange={(value: any) => {
                return `${value}`
              }}
            />
          </Grid>
        )}
      </Grid>
    </form>
  )
}

export default DepositForm
