import React from 'react'
import useStyles from 'auth/styles'
import { Button } from '@material-ui/core'
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
