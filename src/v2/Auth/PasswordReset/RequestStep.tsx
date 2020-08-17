import useStyles from 'v2/Auth/styles'
import { Form, Formik } from 'formik'
import FormikTextField from 'v2/components/form/FormikTextField'
import { Button } from '@material-ui/core'
import React from 'react'
import { RequestPasswordResetArgs } from 'v2/Auth/service/types'
import { requestPasswordResetValidationSchema } from 'v2/Auth/validation'
import { isSubmitDisabled } from 'v2/helpers/formik'
import AuthFormMessage from 'v2/Auth/components/AuthFormMessage'
import { usePasswordResetStore } from 'v2/Auth/context/password-reset'
import { useAuthRouter } from 'v2/Auth/router'

export const requestPasswordResetInitialValues = {
  email: ''
}

const RequestStep: React.FC = () => {
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

export default RequestStep
