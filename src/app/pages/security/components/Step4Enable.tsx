import React from 'react'
import { Typography, Grid } from '@mui/material'
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
  update2FA?: boolean
}

export const Step4Enable = ({
  nextStep,
  update2FA = false
}: Step4EnableProps) => {
  const [enable2fa] = useEnable2fa(nextStep, !update2FA)
  const onSubmit = async (values: Enable2faFormValues) => {
    await enable2fa(values)
  }

  return (
    <StepWrapper
      title={
        update2FA
          ? 'Enable Authenticator by Verifying Your Account'
          : 'Enable Authenticator App'
      }
    >
      <Grid container direction='column' spacing={3} alignItems='center'>
        <Grid item xs={12} md={8} lg={6}>
          <Typography align='center' variant='body1'>
            Please enter the 6-digit code from your {update2FA ? 'new' : ''}{' '}
            authenticator app
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
      </Grid>
    </StepWrapper>
  )
}
