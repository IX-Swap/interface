import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { createTypedAssetSelect } from 'v2/components/form/typed/AssetSelect'
import { createTypedNumberInput } from 'v2/components/form/typed/NumberInput'
import { DepositCashFormValues } from 'v2/app/accounts/types'
import { useFormContext } from 'react-hook-form'

const AssetSelect = createTypedAssetSelect<DepositCashFormValues>()
const NumberInput = createTypedNumberInput<DepositCashFormValues>()

export const Setup: React.FC = () => {
  const { watch } = useFormContext<DepositCashFormValues>()
  const asset = watch('asset')

  return (
    <Grid container justify='center'>
      <Box m={3}>
        <Grid container justify='space-between' style={{ width: 230 }}>
          <AssetSelect
            name='asset'
            assetType='Currency'
            fullWidth={false}
            style={{ width: 70 }}
          />
          <NumberInput
            name='amount'
            label='Amount'
            fullWidth={false}
            style={{ width: 150 }}
            disabled={asset === undefined}
            helperText='Transaction fees may apply'
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
