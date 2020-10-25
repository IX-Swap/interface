import React from 'react'
import { WithdrawCashFormValues } from 'v2/app/pages/accounts/types'
import { Grid, Input, InputAdornment } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { TypedField } from 'v2/components/form/TypedField'
import { BankSelect } from 'v2/components/form/BankSelect'
import { NumericInput } from 'v2/components/form/NumericInput'
import { numericValueExtractor } from 'v2/helpers/forms'

export const Setup: React.FC = () => {
  const { watch, control } = useFormContext<WithdrawCashFormValues>()
  const bankId = watch('bank')
  const { data } = useBanksData()
  const bank = data.map[bankId]

  return (
    <Grid container justify='center'>
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <TypedField
            control={control}
            component={BankSelect}
            name='bank'
            label='To Bank Account'
          />
        </Grid>
        {bankId !== undefined ? (
          <>
            <Grid item>
              <TypedField
                control={control}
                component={NumericInput}
                name='amount'
                label='Amount'
                helperText='Transaction fees may apply'
                startAdornment={
                  <InputAdornment position='start'>
                    {bank.currency.numberFormat.currency}
                  </InputAdornment>
                }
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
            <Grid item>
              <TypedField
                control={control}
                component={Input}
                name='memo'
                label='Memo'
              />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Grid>
  )
}
