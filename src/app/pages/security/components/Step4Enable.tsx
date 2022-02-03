import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { Enable2faFormValues } from 'app/pages/security/types'
import { Form } from 'components/form/Form'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { EnableFormFields } from 'app/pages/security/components/EnableFormFields'
import { useEnable2fa } from 'app/pages/security/hooks/useEnable2fa'

const defaultValues = {
  otp: ''
}

export interface Step4EnableProps {
  nextStep: () => void
}

export const Step4Enable = ({ nextStep }: Step4EnableProps) => {
  const [enable2fa] = useEnable2fa(nextStep)
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
            onSubmit={onSubmit}
            data-testid='form'
          >
            <EnableFormFields />
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
