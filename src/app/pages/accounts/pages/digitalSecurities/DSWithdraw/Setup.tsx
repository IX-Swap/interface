import React from 'react'
import { Grid, Input } from '@material-ui/core'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { useDSRouter } from 'app/pages/accounts/pages/digitalSecurities/router'
import { Alert } from '@material-ui/lab'
import { ContinueButton } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { TypedField } from 'components/form/TypedField'
import { useFormContext } from 'react-hook-form'
import { WithdrawDSFormValues } from 'app/pages/accounts/types'
import { NumericInput } from 'components/form/NumericInput'
import { numericValueExtractor } from 'helpers/forms'
import { moneyNumberFormat } from 'config/numberFormat'
import { privateClassNames } from 'helpers/classnames'

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
          className={privateClassNames()}
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
          numberFormat={moneyNumberFormat}
        />
      </Grid>
      <Grid item>
        <TypedField
          className={privateClassNames()}
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
