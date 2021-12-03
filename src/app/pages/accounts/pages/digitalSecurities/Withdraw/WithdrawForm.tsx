import { Box, Grid } from '@material-ui/core'
import { TokensField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/TokensField'
import { WithdrawalAmount } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawalAmount'
import { WithdrawTo } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawTo'
import { withdrawValidationSchema } from 'app/pages/accounts/validation'
import { Form } from 'components/form/Form'
import React from 'react'
import { useCustodyWithdrawal } from 'app/pages/accounts/hooks/useCustodyWithdrawal'
import { ConfirmButton } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/ConfirmButton'

export interface WithdrawFormValues {
  token: string
  addressType: string
  existingAddress: string
  newAddress: string
  amount: number
  memo: string
}

export const WithdrawForm = () => {
  const [mutate, { isLoading, isSuccess }] = useCustodyWithdrawal()

  const handleSubmit = (values: any) => {
    const args = {
      assetTicker: values.token,
      quantity: values.amount.toString(),
      memo: values.memo !== '' ? values.memo : undefined,
      toAddress:
        values.addressType === 'new'
          ? values.newAddress
          : values.existingAddress
    }
    void mutate(args)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validationSchema={withdrawValidationSchema}
      defaultValues={{
        token: '',
        addressType: 'new',
        existingAddress: '',
        newAddress: '',
        amount: 0,
        memo: ''
      }}
    >
      <Box maxWidth={900} m='0 auto'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TokensField />
          </Grid>
          <Grid item xs={12}>
            <WithdrawTo />
          </Grid>
          <Grid item xs={12}>
            <WithdrawalAmount />
          </Grid>
          <Grid item xs={12}>
            <ConfirmButton disabled={isLoading} isSuccess={isSuccess} />
          </Grid>
        </Grid>
      </Box>
    </Form>
  )
}
