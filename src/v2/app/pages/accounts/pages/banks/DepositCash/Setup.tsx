import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { DepositCashFormValues } from 'v2/app/pages/accounts/types'
import { useDepositCashForm } from './DepositForm'
import { useFormContext } from 'react-hook-form'

export const Setup: React.FC = () => {
  const { AssetSelect, NumericField } = useDepositCashForm()
  const { watch } = useFormContext<DepositCashFormValues>()
  const asset = watch('asset')

  return (
    <Grid container justify='center'>
      <Box m={3}>
        <Grid container justify='space-between' style={{ width: 230 }}>
          <AssetSelect assetType='Currency' name='asset' label='Currency' />
          <NumericField
            name='amount'
            label='Amount'
            helperText='Transaction fees may apply'
            formControlProps={{
              disabled: asset === undefined,
              fullWidth: false,
              style: { width: 150 }
            }}
            numberFormat={{
              decimalScale: 2,
              inputMode: 'numeric',
              thousandSeparator: true,
              allowEmptyFormatting: true,
              isNumericString: true
            }}
          />
        </Grid>
      </Box>
    </Grid>
  )
}
