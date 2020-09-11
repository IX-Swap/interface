import useStyles from 'v2/auth/styles'
import React from 'react'
import { CompletePasswordResetArgs } from 'v2/auth/service/types'
import { completePasswordResetValidationSchema } from 'v2/auth/validation'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import { useCompletePasswordReset } from 'v2/auth/hooks/useCompletePasswordReset'
import { createTypedForm } from 'v2/components/form/typed/createTypedForm'
import { Button } from '@material-ui/core'

type CompletePasswordResetFormValues = Omit<CompletePasswordResetArgs, 'email'>

export const completePasswordResetInitialValues = {
  resetToken: '',
  newPassword: ''
}

export const useCompleteResetPasswordForm = createTypedForm<
  CompletePasswordResetFormValues
>()

export const ResetStep: React.FC = () => {
  const classes = useStyles()
  const [completeReset] = useCompletePasswordReset()
  const { setCurrentStep, email } = usePasswordResetStore()
  const { Form, Submit, TextField } = useCompleteResetPasswordForm()

  const handleSubmit = async (
    values: CompletePasswordResetFormValues
  ): Promise<void> => {
    await completeReset({ ...values, email } as CompletePasswordResetArgs)
  }

  const goBack = (): void => {
    setCurrentStep(PasswordResetStep.Request)
  }

  return (
    <Form
      data-testid='reset-step'
      defaultValues={completePasswordResetInitialValues}
      validationSchema={completePasswordResetValidationSchema}
      onSubmit={handleSubmit}
    >
      <TextField name='resetToken' label='Password Reset Token' />
      <TextField name='newPassword' label='New Password' />
      <div className={classes.formButtons}>
        <Button
          color='primary'
          size='large'
          className={classes.forgetButton}
          onClick={goBack}
        >
          Back
        </Button>

        <Submit variant='contained' color='primary'>
          Complete
        </Submit>
      </div>
    </Form>
  )
}
