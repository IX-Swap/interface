import React from 'react'
import { createTypedBanksSelect } from 'v2/components/form/typed/BankSelect'
import { WithdrawCashFormValues } from 'v2/app/accounts/types'
import { createTypedNumberInput } from 'v2/components/form/typed/NumberInput'
import { createTypedTextInput } from 'v2/components/form/typed/TextInput'
import { Box, Grid, InputAdornment } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { useBanks } from 'v2/app/accounts/banks/hooks/useBanks'

const BankSelect = createTypedBanksSelect<WithdrawCashFormValues>()
const NumberInput = createTypedNumberInput<WithdrawCashFormValues>()
const TextInput = createTypedTextInput<WithdrawCashFormValues>()

export const Setup: React.FC = () => {
  const { watch } = useFormContext<WithdrawCashFormValues>()
  const bankId = watch('bank')
  const { data } = useBanks()
  const bank = data.map[bankId]

  return (
    <Grid container justify='center'>
      <Box m={3}>
        <Grid container justify='space-between' style={{ width: 230 }}>
          <BankSelect name='bank' label='To Bank Account' />
          {bankId !== undefined ? (
            <>
              <NumberInput
                name='amount'
                label='Amount'
                fullWidth={false}
                style={{ width: 150 }}
                inputProps={{
                  symbol: 'SGD'
                }}
                helperText='Transaction fees may apply'
                numberFormat={{
                  decimalScale: 2,
                  inputMode: 'numeric',
                  thousandSeparator: true,
                  allowEmptyFormatting: true,
                  isNumericString: true
                }}
                startAdornment={
                  <InputAdornment position='start'>
                    {bank.asset.numberFormat.currency}
                  </InputAdornment>
                }
              />
              <TextInput name='memo' label='Memo' />
            </>
          ) : null}
        </Grid>
      </Box>
    </Grid>
  )
}
