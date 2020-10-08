import useStyles from 'v2/auth/styles'
import { Button } from '@material-ui/core'
import React from 'react'
import { RequestPasswordResetArgs } from 'v2/auth/service/types'
import { requestPasswordResetValidationSchema } from 'v2/auth/validation'
import { useAuthRouter } from 'v2/auth/router'
import { useRequestPasswordReset } from 'v2/auth/hooks/useRequestPasswordReset'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'

export const requestPasswordResetInitialValues = {
  email: ''
}

export const useRequestPasswordResetForm = createTypedForm<
  RequestPasswordResetArgs
>()

export const RequestStep: React.FC = () => {
  const classes = useStyles()
  const { Form, TextField, Submit } = useRequestPasswordResetForm()
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
      <TextField name='email' label='Email Address' />
      <div className={classes.formButtons}>
        <Button color='primary' size='large' className={classes.forgetButton}>
          <AppRouterLink to={paths.login}>Back to Login</AppRouterLink>
        </Button>

        <Submit variant='contained' color='primary'>
          Reset
        </Submit>
      </div>
    </Form>
  )
}
