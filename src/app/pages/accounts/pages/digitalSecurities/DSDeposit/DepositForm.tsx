import React from 'react'
import { DepositFormFields } from 'app/pages/accounts/pages/digitalSecurities/DSDeposit/DepositFormFields'
import { withdrawValidationSchema } from 'app/pages/accounts/validation'
import { Form } from 'components/form/Form'
import { Box, Grid } from '@material-ui/core'

export const DepositForm: React.FC = () => {
  return (
    <Form
      validationSchema={withdrawValidationSchema}
      defaultValues={{
        token: ''
      }}
    >
      <Box maxWidth={900} m='0 auto'>
        <Grid container spacing={3}>
          <DepositFormFields />
        </Grid>
      </Box>
    </Form>
  )
}
