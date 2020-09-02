import useStyles from 'v2/auth/styles'
import { Form, Formik } from 'formik'
import FormikTextField from 'v2/components/form/FormikTextField'
import { Button } from '@material-ui/core'
import React from 'react'
import { RequestPasswordResetArgs } from 'v2/auth/service/types'
import { requestPasswordResetValidationSchema } from 'v2/auth/validation'
import { isSubmitDisabled } from 'v2/helpers/formik'
import { AuthFormMessage } from 'v2/auth/components/AuthFormMessage'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'
import { useAuthRouter } from 'v2/auth/router'

export const requestPasswordResetInitialValues = {
  email: ''
}

export const RequestStep: React.FC = () => {
  const classes = useStyles()
  const { requestReset } = usePasswordResetStore()
  const { push } = useAuthRouter()

  const handleSubmit = async (
    values: RequestPasswordResetArgs
  ): Promise<void> => {
    await requestReset(values)
  }

  const goToLogin = (): void => {
    push('login')
  }

  return (
    <>
      <AuthFormMessage />
      <Formik
        initialValues={requestPasswordResetInitialValues}
        validationSchema={requestPasswordResetValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, ...formik }) => (
          <Form data-testid='request-step'>
            <FormikTextField fieldKey='email' placeholder='Email Address' />
            <div className={classes.formButtons}>
              <Button
                color='primary'
                size='large'
                className={classes.forgetButton}
                onClick={goToLogin}
              >
                Back to Login
              </Button>

              <Button
                variant='contained'
                color='primary'
                onClick={submitForm}
                disabled={isSubmitDisabled(formik)}
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
