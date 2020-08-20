import React from 'react'
import { Button } from '@material-ui/core'
import { Formik, Form } from 'formik'
import { observer } from 'mobx-react'

import { useUserStore } from 'v2/auth/context'
import useStyles from 'v2/auth/styles'
import AuthFormMessage from 'v2/auth/components/AuthFormMessage'
import { LoginArgs } from 'v2/auth/service/types'
import { loginFormValidationSchema } from 'v2/auth/validation'
import FormikTextField from 'v2/components/form/FormikTextField'
import { isSubmitDisabled } from 'v2/helpers/formik'
import { useAuthRouter } from 'v2/auth/router'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

const Login: React.FC = () => {
  const classes = useStyles()
  const { push } = useAuthRouter()
  const { login } = useUserStore()

  const handleSubmit = async (values: LoginArgs): Promise<void> => {
    await login(values)
  }

  const goToReset = (): void => {
    push('passwordReset')
  }

  return (
    <>
      <AuthFormMessage />
      <Formik<LoginArgs>
        initialValues={loginFormInitialValues}
        validationSchema={loginFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, ...formik }) => (
          <Form data-testid='login-form'>
            <FormikTextField
              fieldKey='email'
              type='email'
              placeholder='Email Address'
            />
            <FormikTextField
              fieldKey='password'
              placeholder='Password'
              type='password'
            />
            <FormikTextField
              fieldKey='otp'
              variant='outlined'
              label='OTP Code (optional)'
              autoComplete='off'
            />
            <div className={classes.formButtons}>
              <Button
                variant='contained'
                color='primary'
                disabled={isSubmitDisabled(formik)}
                onClick={submitForm}
              >
                Login
              </Button>

              <Button
                color='primary'
                size='large'
                className={classes.forgetButton}
                onClick={goToReset}
              >
                Forgot Password?
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default observer(Login)
