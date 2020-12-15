import React from 'react'
import { WithdrawCashFormValues } from 'app/pages/accounts/types'
import { Grid, Input, InputAdornment } from '@material-ui/core'
import { useFormContext } from 'react-hook-form'
import { useBanksData } from 'app/pages/accounts/pages/banks/hooks/useBanksData'
import { TypedField } from 'components/form/TypedField'
import { BankSelect } from 'components/form/BankSelect'
import { NumericInput } from 'components/form/NumericInput'
import { numericValueExtractor } from 'helpers/forms'
import { moneyNumberFormat } from 'config/numberFormat'
import { privateClassNames } from 'helpers/classnames'

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
                valueExtractor={numericValueExtractor}
                numberFormat={moneyNumberFormat}
                startAdornment={
                  <InputAdornment position='start'>
                    {bank.currency.numberFormat.currency}
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item>
              <TypedField
                className={privateClassNames()}
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
