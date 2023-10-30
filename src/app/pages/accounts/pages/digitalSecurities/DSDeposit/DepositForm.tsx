import React from 'react'
import { DepositFormFields } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields'
import { withdrawValidationSchema } from 'app/pages/accounts/validation'
import { Form } from 'components/form/Form'
import { Typography } from '@mui/material'

export const DepositForm: React.FC = () => {
  return (
    <Form
      validationSchema={withdrawValidationSchema}
      defaultValues={{
        token: ''
      }}
    >
      <Typography variant='h3' textAlign={'center'} mb={5}>
        Deposit My Tokens
      </Typography>
      <DepositFormFields />
    </Form>
  )
}
