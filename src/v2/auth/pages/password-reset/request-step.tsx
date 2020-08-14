import useStyles from '../../styles'
import { Form, Formik } from 'formik'
import FormikTextField from '../../../components/form/formik-text-field'
import { Button } from '@material-ui/core'
import React from 'react'
import { RequestPasswordResetArgs } from 'v2/auth/service/types'
import { requestPasswordResetValidationSchema } from 'v2/auth/validation'
import { isSubmitDisabled } from 'v2/helpers/formik'
import AuthFormMessage from 'v2/auth/components/auth-form-message'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'
import history from 'v2/history'

export const requestPasswordResetInitialValues = {
  email: ''
}

const RequestStep = () => {
  const classes = useStyles()
  const { requestReset } = usePasswordResetStore()

  const handleSubmit = async (values: RequestPasswordResetArgs) => {
    await requestReset(values)
  }

  const goToLogin = () => {
    history.push('/auth/login')
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
