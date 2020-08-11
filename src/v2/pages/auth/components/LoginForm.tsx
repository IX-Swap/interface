import React from 'react'
import { Button } from '@material-ui/core'
import { Formik, Form } from 'formik'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { useUserStore } from '../../../context/user'
import useStyles from '../styles'
import AuthFormMessage from './AuthFormMessage'
import { LoginArgs } from 'v2/services/api/auth/types'
import { loginFormValidationSchema } from '../validation'
import FormikTextField from '../../../components/form/formik-text-field'
import { isSubmitDisabled } from '../../../helpers/formik'

export const loginFormInitialValues = {
  email: '',
  password: '',
  otp: ''
}

const LoginForm = () => {
  const classes = useStyles()
  const history = useHistory()
  const { login } = useUserStore()

  const handleSubmit = async (values: LoginArgs) => {
    await login(values)
  }

  const goToReset = () => {
    history.push({
      pathname: '/reset'
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
          <Form data-testid='loginForm'>
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

export default observer(LoginForm)
