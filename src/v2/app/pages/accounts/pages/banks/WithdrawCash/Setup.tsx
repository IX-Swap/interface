import React from 'react'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { Box, Grid, InputAdornment } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { useWithdrawCashForm } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawForm'

export const Setup: React.FC = () => {
  const { NumericField, TextField, BankSelect } = useWithdrawCashForm()
  const { watch } = useFormContext<WithdrawCashFormValues>()
  const bankId = watch('bank')
  const { data } = useBanksData()
  const bank = data.map[bankId]

  return (
    <Grid container justify='center'>
      <Box m={3}>
        <Grid container justify='space-between' style={{ width: 230 }}>
          <BankSelect name='bank' label='To Bank Account' />
          {bankId !== undefined ? (
            <>
              <NumericField
                name='amount'
                label='Amount'
                helperText='Transaction fees may apply'
                formControlProps={{
                  fullWidth: false,
                  style: { width: 150 }
                }}
                inputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      {bank.currency.numberFormat.currency}
                    </InputAdornment>
                  )
                }}
                numberFormat={{
                  decimalScale: 2,
                  inputMode: 'numeric',
                  thousandSeparator: true,
                  allowEmptyFormatting: true,
                  isNumericString: true
                }}
              />
              <TextField name='memo' label='Memo' />
            </>
          ) : null}
        </Grid>
      </Box>
    </Grid>
  )
}
