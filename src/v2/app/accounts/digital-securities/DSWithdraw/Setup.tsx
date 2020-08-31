import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { useAllBalances } from 'v2/context/balances/useAllBalances'
import { useParams } from 'react-router-dom'
import { createTypedTextInput } from 'v2/components/form/typed/TextInput'
import { WithdrawDSFormValues } from 'v2/app/accounts/types'
import { createTypedNumberInput } from 'v2/components/form/typed/NumberInput'
import { Alert } from '@material-ui/lab'
import { ContinueButton } from 'v2/app/accounts/digital-securities/DSWithdraw/ContinueButton'

const TextField = createTypedTextInput<WithdrawDSFormValues>()
const NumberInput = createTypedNumberInput<WithdrawDSFormValues>()

export const Setup: React.FC = () => {
  const { balanceId } = useParams<{ balanceId: string }>()
  const { data } = useAllBalances()
  const balance = data.map[balanceId]

  return (
    <Box my={3} width={300}>
      <Grid container direction='column'>
        <Alert severity='warning'>
          Please double check the address because we are unable to recover{' '}
          {balance.symbol} sent to a wrong address.
        </Alert>
        <Grid item>
          <TextField
            name='recipientWallet'
            label={`Recipients ${balance.symbol} Address`}
          />
        </Grid>
        <Grid item>
          <NumberInput
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
      </Grid>
      <ContinueButton />
    </Box>
  )
}
