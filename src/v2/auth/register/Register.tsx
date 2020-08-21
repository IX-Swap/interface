import React from 'react'
import { Button } from '@material-ui/core'
import { Formik, Form } from 'formik'
import { useUserStore } from 'v2/auth/context'
import { AuthFormMessage } from 'v2/auth/components/AuthFormMessage'
import useStyles from 'v2/auth/styles'
import { registerFormValidationSchema } from 'v2/auth/validation'
import FormikTextField from 'v2/components/form/FormikTextField'
import { isSubmitDisabled } from 'v2/helpers/formik'
import { SignupArgs } from 'v2/auth/service/types'
import { observer } from 'mobx-react'

export const registerFormInitialValues = {
  name: '',
  email: '',
  password: ''
}

export const Register: React.FC = observer(() => {
  const { signup } = useUserStore()
  const classes = useStyles()

  const handleSubmit = async (values: SignupArgs): Promise<void> => {
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
          <Form data-testid='register-form'>
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
})
