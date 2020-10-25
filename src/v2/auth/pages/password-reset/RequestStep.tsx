import React from 'react'
import useStyles from 'v2/auth/styles'
import { Button } from '@material-ui/core'
import { RequestPasswordResetArgs } from 'v2/types/auth'
import { requestPasswordResetValidationSchema } from 'v2/auth/validation'
import { useAuthRouter } from 'v2/auth/router'
import { useRequestPasswordReset } from 'v2/auth/hooks/useRequestPasswordReset'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'
import { Form } from 'v2/components/form/Form'
import { RequestFields } from 'v2/auth/pages/password-reset/components/RequestFields'
import { Submit } from 'v2/components/form/Submit'

export const requestPasswordResetInitialValues = {
  email: ''
}

export const RequestStep: React.FC = () => {
  const classes = useStyles()
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
      <RequestFields />
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
