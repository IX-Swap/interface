import { Grid } from '@mui/material'
import { CurrencySelect } from 'components/form/CurrencySelect'
import { NumericInput } from 'components/form/NumericInput'
import { TypedField } from 'components/form/TypedField'
import { leadingZerosNumberFormat } from 'config/numberFormat'
import { numericStringValueExtractor } from 'helpers/forms'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const AddVirtualAccountsFormFields = () => {
  const { control } = useFormContext()

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <TypedField
          control={control}
          component={NumericInput}
          valueExtractor={numericStringValueExtractor}
          numberFormat={leadingZerosNumberFormat}
          variant='outlined'
          name='from'
          label='Virtual Accounts From'
        />
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          component={NumericInput}
          valueExtractor={numericStringValueExtractor}
          numberFormat={leadingZerosNumberFormat}
          variant='outlined'
          name='to'
          label='Virtual Accounts To'
        />
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          fullWidth
          component={CurrencySelect}
          variant='outlined'
          name='currency'
          label='Currency'
        />
      </Grid>
    </Grid>
  )
}
