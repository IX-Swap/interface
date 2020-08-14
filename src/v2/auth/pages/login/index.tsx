import React from 'react'
import { Button } from '@material-ui/core'
import { Formik, Form } from 'formik'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { useUserStore } from 'v2/auth/context'
import useStyles from '../../styles'
import AuthFormMessage from '../../components/auth-form-message'
import { LoginArgs } from 'v2/auth/service/types'
import { loginFormValidationSchema } from '../../validation'
import FormikTextField from '../../../components/form/formik-text-field'
import { isSubmitDisabled } from 'v2/helpers/formik'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

const Login = () => {
  const classes = useStyles()
  const history = useHistory()
  const { login } = useUserStore()

  const handleSubmit = async (values: LoginArgs) => {
    await login(values)
  }

  const goToReset = () => {
    history.push({
      pathname: '/auth/password-reset'
    })
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
