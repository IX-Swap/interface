import React from 'react'
import { Typography, Grid, Divider } from '@mui/material'
import { ResendVerificationEmailArgs } from 'types/auth'
import { resendVerificationEmailValidationSchema } from 'validation/auth'
import { useResendVerificationEmail } from 'auth/hooks/useResendVerificationEmail'
import { AppRouterLink } from 'components/AppRouterLink'
import { Form } from 'components/form/Form'
import { ResendFields } from './components/ResendFields'
import { Submit } from 'components/form/Submit'
import { AuthRoute } from 'auth/router/config'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './components/ResendFields.styles'
// import { useServices } from 'hooks/useServices'

export const requestPasswordResetInitialValues = {
  email: ''
}

export const ResendVerification: React.FC = () => {
  const { title, text } = useStyles()
  const [requestReset] = useResendVerificationEmail()
  //   const { sessionService } = useServices()

  const handleSubmit = async (
    values: ResendVerificationEmailArgs
  ): Promise<void> => {
    await requestReset({
      ...values
      //   tenantId: sessionService?.get('tenantId')
    })
  }

  return (
    <Form
      data-testid='resend-verification'
      defaultValues={requestPasswordResetInitialValues}
      validationSchema={resendVerificationEmailValidationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container direction='column' spacing={4}>
        <Grid item>
          <Typography className={title} variant={'h3'} align='center'>
            Resend Email
            <br />
            Verification Link
          </Typography>
          <VSpacer size={'medium'} />
        </Grid>
        <ResendFields />
        <Grid item container justifyContent='center'>
          <Submit variant='contained' color='primary' size='large' fullWidth>
            Resend Verification Link
          </Submit>
        </Grid>
        <Grid item>
          <VSpacer size={'small'} />
          <Divider />
        </Grid>
        <Grid item>
          <Typography align='center' className={text}>
            Don&apos;t have an account?{' '}
            <AppRouterLink to={AuthRoute.signup} style={{ color: '#ffffff' }}>
              Create an account
            </AppRouterLink>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  )
}
