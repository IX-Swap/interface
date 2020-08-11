import React from 'react'
import { Button } from '@material-ui/core'
import { Formik, Form } from 'formik'

import { useUserStore } from '../../../context/user'
import AuthFormMessage from './AuthFormMessage'
import useStyles from '../styles'
import { registerFormValidationSchema } from '../validation'
import FormikTextField from 'v2/components/form/formik-text-field'
import { isSubmitDisabled } from 'v2/helpers/formik'
import { SignupArgs } from 'v2/services/api/auth/types'

export const registerFormInitialValues = {
  name: '',
  email: '',
  password: ''
}

const SignupForm = () => {
  const { signup } = useUserStore()
  const classes = useStyles()

  const handleSubmit = async (values: SignupArgs) => {
    await signup(values)
  }

  return (
    <>
      <AuthFormMessage />
      <Formik<SignupArgs>
        initialValues={registerFormInitialValues}
        validationSchema={registerFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, ...formik }) => (
          <Form data-testid='signupForm'>
            <FormikTextField fieldKey='name' placeholder='Name' />
            <FormikTextField
              fieldKey='email'
              placeholder='Email Address'
              type='email'
            />
            <FormikTextField
              fieldKey='password'
              placeholder='Password'
              type='password'
            />
            <div className={classes.creatingButtonContainer}>
              <Button
                onClick={submitForm}
                disabled={isSubmitDisabled(formik)}
                size='large'
                variant='contained'
                color='primary'
                fullWidth
              >
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SignupForm
