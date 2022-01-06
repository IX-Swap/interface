import { Grid } from '@material-ui/core'
import React from 'react'
import { DepositCashFormValues } from 'app/pages/accounts/types'
import { useFormContext } from 'react-hook-form'
import { TypedField } from 'components/form/TypedField'
import { AssetSelect } from 'components/form/AssetSelect/AssetSelect'
import { NumericInput } from 'components/form/NumericInput'
import { numericValueExtractor } from 'helpers/forms'
import { moneyNumberFormat } from 'config/numberFormat'

export const Setup: React.FC = () => {
  const { watch, control } = useFormContext<DepositCashFormValues>()
  const asset = watch('asset')

  return (
    <Grid container justifyContent='center' direction='column' spacing={2}>
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
          numberFormat={moneyNumberFormat}
        />
      </Grid>
    </Grid>
  )
}
