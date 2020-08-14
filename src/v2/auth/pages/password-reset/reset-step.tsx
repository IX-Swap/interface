import useStyles from '../../styles'
import { Form, Formik } from 'formik'
import FormikTextField from '../../../components/form/formik-text-field'
import { Button } from '@material-ui/core'
import React from 'react'
import { CompletePasswordResetArgs } from 'v2/auth/service/types'
import { isSubmitDisabled } from 'v2/helpers/formik'
import { completePasswordResetValidationSchema } from 'v2/auth/validation'
import AuthFormMessage from 'v2/auth/components/auth-form-message'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'

export const completePasswordResetInitialValues = {
  resetToken: '',
  newPassword: ''
}

const ResetStep = () => {
  const classes = useStyles()
  const { completeReset, setCurrentStep, email } = usePasswordResetStore()

  const handleSubmit = async (
    values: Omit<CompletePasswordResetArgs, 'email'>
  ) => {
    const args = { ...values, email } as CompletePasswordResetArgs
    await completeReset(args)
  }

  const goBack = () => {
    setCurrentStep(PasswordResetStep.Request)
  }

  return (
    <>
      <AuthFormMessage />
      <Formik
        initialValues={completePasswordResetInitialValues}
        validationSchema={completePasswordResetValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, ...formik }) => (
          <Form data-testid='reset-step'>
            <FormikTextField
              fieldKey='resetToken'
              placeholder='Password Reset Token'
            />
            <FormikTextField
              fieldKey='newPassword'
              placeholder='New Password'
            />
            <div className={classes.formButtons}>
              <Button
                color='primary'
                size='large'
                className={classes.forgetButton}
                onClick={goBack}
              >
                Back
              </Button>

              <Button
                variant='contained'
                color='primary'
                onClick={submitForm}
                disabled={isSubmitDisabled(formik)}
              >
                Complete
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default ResetStep
