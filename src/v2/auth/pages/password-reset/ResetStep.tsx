import useStyles from 'v2/auth/styles'
import React from 'react'
import { CompletePasswordResetArgs } from 'v2/types/auth'
import { completePasswordResetValidationSchema } from 'v2/auth/validation'
import { usePasswordResetStore } from 'v2/auth/context/password-reset'
import { PasswordResetStep } from 'v2/auth/context/password-reset/types'
import { useCompletePasswordReset } from 'v2/auth/hooks/useCompletePasswordReset'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { Button, Grid } from '@material-ui/core'
import { useUnmountCallback } from 'v2/hooks/useUnmountCallback'

type CompletePasswordResetFormValues = Omit<
  CompletePasswordResetArgs,
  'resetToken'
>

export const completePasswordResetInitialValues = {
  email: '',
  newPassword: ''
}

export const useCompleteResetPasswordForm = createTypedForm<
  CompletePasswordResetFormValues
>()

export const ResetStep: React.FC = () => {
  const classes = useStyles()
  const [completeReset] = useCompletePasswordReset()
  const { setCurrentStep, email, token, reset } = usePasswordResetStore()
  const { Form, Submit, TextField } = useCompleteResetPasswordForm()

  const handleSubmit = async (
    values: CompletePasswordResetFormValues
  ): Promise<void> => {
    await completeReset({
      ...values,
      resetToken: token
    } as CompletePasswordResetArgs)
  }

  const goBack = (): void => {
    setCurrentStep(PasswordResetStep.Request)
  }

  useUnmountCallback(reset)

  return (
    <Form
      data-testid='reset-step'
      defaultValues={{ email }}
      validationSchema={completePasswordResetValidationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <TextField name='email' label='Email' />
        </Grid>
        <Grid item>
          <TextField name='newPassword' label='New Password' />
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </Form>
  )
}
