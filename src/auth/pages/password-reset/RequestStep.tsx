import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { RequestPasswordResetArgs } from 'types/auth'
import { requestPasswordResetValidationSchema } from 'validation/auth'
import { useRequestPasswordReset } from 'auth/hooks/useRequestPasswordReset'
import { AppRouterLink } from 'components/AppRouterLink'
import { usePasswordResetStore } from 'auth/context/password-reset'
import { Form } from 'components/form/Form'
import { RequestFields } from 'auth/pages/password-reset/components/RequestFields'
import { Submit } from 'components/form/Submit'
import { AuthRoute } from 'auth/router/config'

export const requestPasswordResetInitialValues = {
  email: ''
}

export const RequestStep: React.FC = () => {
  const [requestReset] = useRequestPasswordReset()
  const { setEmail } = usePasswordResetStore()

  const handleSubmit = async (
    values: RequestPasswordResetArgs
  ): Promise<void> => {
    setEmail(values.email)
    await requestReset(values)
  }

  return (
    <Form
      data-testid='request-step'
      defaultValues={requestPasswordResetInitialValues}
      validationSchema={requestPasswordResetValidationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container direction='column' spacing={2}>
        <RequestFields />
        <Grid item container justifyContent='center'>
          <Submit variant='contained' color='primary' size='large'>
            Reset
          </Submit>
        </Grid>
        <Grid item>
          <Typography align='center'>
            <AppRouterLink to={AuthRoute.login}>Back to Login</AppRouterLink>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  )
}
