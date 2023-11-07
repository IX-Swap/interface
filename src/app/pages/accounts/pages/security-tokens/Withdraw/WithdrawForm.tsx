import { Box, Grid, Typography } from '@mui/material'
import { withdrawValidationSchema } from 'app/pages/accounts/validation'
import { Form } from 'components/form/Form'
import React from 'react'
import { useCustodyWithdrawal } from 'app/pages/accounts/hooks/useCustodyWithdrawal'
import { WithdrawFormFields } from 'app/pages/accounts/pages/security-tokens/Withdraw/WithdrawFormFields'

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
      otp: values.otp,
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
      <Typography variant='h3' textAlign={'center'} mb={5}>
        Withdraw My Tokens
      </Typography>
      <WithdrawFormFields isLoading={isLoading} isSuccess={isSuccess} />
    </Form>
  )
}
