import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { Alert } from '@material-ui/lab'
import { ContinueButton } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/ContinueButton'
import { useDSWithdrawForm } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/WithdrawForm'
import { VSpacer } from 'v2/components/VSpacer'

export const Setup: React.FC = () => {
  const { NumericField, TextField } = useDSWithdrawForm()
  const {
    params: { balanceId }
  } = useDSRouter()
  const { data, isLoading } = useAllBalances()
  const balance = data.map[balanceId]

  if (isLoading) {
    return null
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <Alert severity='warning'>
          Please double check the address because we are unable to recover{' '}
          {balance.symbol} sent to a wrong address.
        </Alert>
      </Grid>
      <Grid item>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <TextField
          name='recipientWallet'
          label={`Recipients ${balance.symbol} Address`}
        />
      </Grid>
      <Grid item>
        <NumericField
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
        <TextField label='Memo' name='memo' />
      </Grid>
      <Grid item>
        <VSpacer size='small' />
      </Grid>
      <Grid item container justify='flex-end'>
        <ContinueButton />
      </Grid>
    </Grid>
  )
}
