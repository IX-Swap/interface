import React from 'react'
import { CompletePasswordResetArgs } from 'types/auth'
import { completePasswordResetValidationSchema } from 'validation/auth'
import { usePasswordResetStore } from 'auth/context/password-reset'
import { PasswordResetStep } from 'auth/context/password-reset/types'
import { useCompletePasswordReset } from 'auth/hooks/useCompletePasswordReset'
import { Button, Grid } from '@material-ui/core'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { ResetFields } from 'auth/pages/password-reset/components/ResetFields'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'

export type CompletePasswordResetFormValues = Omit<
  CompletePasswordResetArgs,
  'resetToken'
>

export const completePasswordResetInitialValues = {
  email: '',
  newPassword: ''
}

export const ResetStep: React.FC = () => {
  const [completeReset] = useCompletePasswordReset()
  const { setCurrentStep, email, token, reset } = usePasswordResetStore()

  const handleSubmit = async (
    values: CompletePasswordResetFormValues
  ): Promise<void> => {
    await completeReset({
      ...values,
      resetToken: token as string
    })
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
        <ResetFields />
        <Grid item container justifyContent='center'>
          <Submit variant='contained' color='primary' size='large'>
            Complete
          </Submit>
        </Grid>
        <Grid item container justifyContent='center'>
          <Button color='primary' size='large' onClick={goBack}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}
