import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { Alert } from '@material-ui/lab'
import { ContinueButton } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { TypedField } from 'v2/components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { WithdrawDSFormValues } from 'v2/app/pages/accounts/types'
import { NumericInput } from 'v2/components/form/NumericInput'
import { numericValueExtractor } from 'v2/helpers/forms'

export const Setup: React.FC = () => {
  const { control } = useFormContext<WithdrawDSFormValues>()
  const {
    params: { balanceId }
  } = useDSRouter()
  const { data, isLoading } = useAllBalances()
  const balance = data.map[balanceId]

  if (isLoading) {
    return null
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Alert severity='warning'>
          Please double check the address because we are unable to recover{' '}
          {balance.symbol} sent to a wrong address.
        </Alert>
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          component={Input}
          name='recipientWallet'
          label={`Recipients ${balance.symbol} Address`}
        />
      </Grid>
      <Grid item>
        <TypedField
          control={control}
          component={NumericInput}
          valueExtractor={numericValueExtractor}
          label='Amount'
          name='amount'
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
          label='Memo'
          name='memo'
        />
      </Grid>
      <Grid item container justify='flex-end'>
        <ContinueButton />
      </Grid>
    </Grid>
  )
}
