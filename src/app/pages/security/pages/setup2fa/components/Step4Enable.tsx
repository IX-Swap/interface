import React from 'react'
import { Typography, Box, Grid } from '@mui/material'
import { useEnable2fa } from '../hooks/useEnable2fa'
import { Enable2faFormValues } from '../types'
import { enable2faFormValuesSchema } from '../validation'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { StepWrapper } from 'app/pages/security/pages/setup2fa/components/StepWrapper'
import { EnableFormFields } from 'app/pages/security/pages/setup2fa/components/EnableFormFields'

const defaultValues = {
  otp: ''
}

export const Step4Enable = () => {
  const [enable2fa] = useEnable2fa()
  const onSubmit = async (values: Enable2faFormValues) => {
    await enable2fa(values)
  }

  return (
    <StepWrapper title='Enable Authenticator App'>
      <Grid container direction='column' spacing={3} alignItems='center'>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Please enter the 6 digit code from your authenticator app
          </Typography>
        </Grid>
        <Grid item>
          <Form
            defaultValues={defaultValues}
            validationSchema={enable2faFormValuesSchema}
            onSubmit={onSubmit}
            data-testid='form'
          >
            <EnableFormFields />
            <Box my={4} width='100%' textAlign='center'>
              <Submit>Enable</Submit>
            </Box>
          </Form>
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Once enabled your authenticator you will be logged out and re-enter
            the OTP in order to access the platform
          </Typography>
        </Grid>
      </Grid>
    </StepWrapper>
  )
}
