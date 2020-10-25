import { Grid } from '@material-ui/core'
import React from 'react'
import { DepositCashFormValues } from 'v2/app/pages/accounts/types'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'v2/components/form/TypedField'
import { AssetSelect } from 'v2/components/form/AssetSelect'
import { NumericInput } from 'v2/components/form/NumericInput'
import { numericValueExtractor } from 'v2/helpers/forms'

export const Setup: React.FC = () => {
  const { watch, control } = useFormContext<DepositCashFormValues>()
  const asset = watch('asset')

  return (
    <Grid container justify='center' direction='column' spacing={2}>
      <Grid item>
        <TypedField
          control={control}
          component={AssetSelect}
          assetType='Currency'
          name='asset'
          label='Currency'
        />
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          component={NumericInput}
          name='amount'
          label='Amount'
          helperText='Transaction fees may apply'
          disabled={asset === undefined}
          valueExtractor={numericValueExtractor}
          numberFormat={{
            decimalScale: 2,
            inputMode: 'numeric',
            thousandSeparator: true,
            allowEmptyFormatting: true,
            isNumericString: true
          }}
        />
      </Grid>
    </Grid>
  )
}
