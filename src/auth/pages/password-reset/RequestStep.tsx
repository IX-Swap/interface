import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { RequestPasswordResetArgs } from 'types/auth'
import { requestPasswordResetValidationSchema } from 'validation/auth'
import { useAuthRouter } from 'auth/router'
import { useRequestPasswordReset } from 'auth/hooks/useRequestPasswordReset'
import { AppRouterLink } from 'components/AppRouterLink'
import { usePasswordResetStore } from 'auth/context/password-reset'
import { Form } from 'components/form/Form'
import { RequestFields } from 'auth/pages/password-reset/components/RequestFields'
import { Submit } from 'components/form/Submit'

export const requestPasswordResetInitialValues = {
  email: ''
}

export const RequestStep: React.FC = () => {
  const [requestReset] = useRequestPasswordReset()
  const { setEmail } = usePasswordResetStore()
  const { paths } = useAuthRouter()

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
        <Grid item container justify='space-between' alignItems='center'>
          <Button color='primary' size='large'>
            <AppRouterLink to={paths.login}>Back to Login</AppRouterLink>
          </Button>

          <Submit variant='contained' color='primary' size='large'>
            Reset
          </Submit>
        </Grid>
      </Grid>
    </Form>
  )
}
