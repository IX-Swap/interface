import React from 'react'
import { Typography, Grid } from '@mui/material'
import { Enable2faFormValues } from 'app/pages/security/types'
import { Form } from 'components/form/Form'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { EnableFormFields } from 'app/pages/security/components/EnableFormFields/EnableFormFields'
import { useEnable2fa } from 'app/pages/security/hooks/useEnable2fa'
import { useStyles } from './Step4Enable.styles'

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
  const classes = useStyles()
  const [enable2fa] = useEnable2fa(nextStep, !update2FA)
  const onSubmit = async (values: Enable2faFormValues) => {
    await enable2fa(values)
  }

  return (
    <StepWrapper
      title={
        update2FA ? 'Update Authenticator App' : 'Enable Authenticator App'
      }
    >
      <Grid container justifyContent={'center'}>
        <Grid
          container
          direction='column'
          alignItems='center'
          className={classes.container}
        >
          <Grid item>
            <Typography align='center' variant='body1' className={classes.text}>
              Please enter the 6 digit code from your Authenticator App
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
      </Grid>
    </StepWrapper>
  )
}
