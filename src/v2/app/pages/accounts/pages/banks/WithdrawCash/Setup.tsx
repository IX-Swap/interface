import React from 'react'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { Grid, InputAdornment } from '@material-ui/core'
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
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <BankSelect name='bank' label='To Bank Account' />
        </Grid>
        {bankId !== undefined ? (
          <>
            <Grid item>
              <NumericField
                name='amount'
                label='Amount'
                helperText='Transaction fees may apply'
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
            </Grid>
            <Grid item>
              <TextField name='memo' label='Memo' />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Grid>
  )
}
