import { Button, Grid, Typography } from '@mui/material'
import { usePasswordResetStore } from 'auth/context/password-reset'
import { useCompletePasswordReset } from 'auth/hooks/useCompletePasswordReset'
import { ResetFields } from 'auth/pages/password-reset/components/ResetFields'
import { AuthRoute } from 'auth/router/config'
import { Form } from 'components/form/Form'
import { Submit } from 'components/form/Submit'
import { VSpacer } from 'components/VSpacer'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import React from 'react'
import { Link } from 'react-router-dom'
import { CompletePasswordResetArgs } from 'types/auth'
import { completePasswordResetValidationSchema } from 'validation/auth'
import { useStyles } from './RequestStep.styles'

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
  const { email, token, reset } = usePasswordResetStore()
  const { title } = useStyles()
  const handleSubmit = async (
    values: CompletePasswordResetFormValues
  ): Promise<void> => {
    await completeReset({
      ...values,
      resetToken: token as string
    })
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
          <Typography className={title} variant={'h3'} align='center'>
            Password recovery
          </Typography>
          <VSpacer size={'small'} />
        </Grid>
        <ResetFields />
        <Grid item container justifyContent='center'>
          <Submit
            variant='contained'
            color='primary'
            size='large'
            sx={{ width: '100%' }}
          >
            Complete
          </Submit>
        </Grid>
        <Grid item container justifyContent='center'>
          <Button
            color='secondary'
            variant='outlined'
            size='large'
            component={Link}
            to={AuthRoute.login}
            sx={{ width: '100%' }}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}
