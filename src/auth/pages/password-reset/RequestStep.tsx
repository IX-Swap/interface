import React from 'react'
import { Typography, Grid, Divider } from '@material-ui/core'
import { RequestPasswordResetArgs } from 'types/auth'
import { requestPasswordResetValidationSchema } from 'validation/auth'
import { useRequestPasswordReset } from 'auth/hooks/useRequestPasswordReset'
import { AppRouterLink } from 'components/AppRouterLink'
import { usePasswordResetStore } from 'auth/context/password-reset'
import { Form } from 'components/form/Form'
import { RequestFields } from 'auth/pages/password-reset/components/RequestFields'
import { Submit } from 'components/form/Submit'
import { AuthRoute } from 'auth/router/config'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './RequestStep.styles'

export const requestPasswordResetInitialValues = {
  email: ''
}

export const RequestStep: React.FC = () => {
  const { title } = useStyles()
  const [requestReset] = useRequestPasswordReset()
  const { setEmail } = usePasswordResetStore()

  const handleSubmit = async (
    values: RequestPasswordResetArgs
  ): Promise<void> => {
    setEmail(values.email)
    await requestReset(values)
  }

  return (
    <Form
      data-testid='request-step'
      defaultValues={requestPasswordResetInitialValues}
      validationSchema={requestPasswordResetValidationSchema}
      onSubmit={handleSubmit}
    >
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography className={title} variant={'h3'} align='center'>
            Forgot <br /> Password?
          </Typography>
          <VSpacer size={'small'} />
        </Grid>
        <RequestFields />
        <Grid item container justifyContent='center'>
          <Submit variant='contained' color='primary' size='large' fullWidth>
            Reset
          </Submit>
        </Grid>
        <Grid item>
          <VSpacer size={'small'} />
          <Divider />
        </Grid>
        <Grid item>
          <Typography align='center'>
            <AppRouterLink to={AuthRoute.login} style={{ color: '#ffffff' }}>
              &#8592; Back to Sign In
            </AppRouterLink>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  )
}
