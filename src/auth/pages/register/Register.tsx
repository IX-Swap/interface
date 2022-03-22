import React from 'react'
import { registerFormValidationSchema } from 'validation/auth'
import { SignupArgs } from 'types/auth'
import { observer } from 'mobx-react'
import { useSignup } from 'auth/hooks/useSignup'
import { Divider, Grid, Typography } from '@mui/material'
import { Form } from 'components/form/Form'
import { RegisterFields } from 'auth/pages/register/components/RegisterFields'
import { Submit } from 'components/form/Submit'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'
import { useStyles } from './Register.styles'
import { VSpacer } from 'components/VSpacer'

export const registerFormInitialValues = {
  name: '',
  email: '',
  password: '',
  agree: false
}

export const Register: React.FC = observer(() => {
  const { title, question, link, support } = useStyles({})
  const [signup, { isLoading }] = useSignup()
  const handleSubmit = async (values: SignupArgs) => {
    await signup({
      name: values.name,
      email: values.email,
      password: values.password
    })
  }

  return (
    <Form
      data-testid='register-form'
      defaultValues={registerFormInitialValues}
      validationSchema={registerFormValidationSchema}
      onSubmit={handleSubmit}
      criteriaMode='all'
    >
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography align='center' variant={'h3'} className={title}>
            Sign up
          </Typography>
          <VSpacer size={'medium'} />
        </Grid>
        <Grid item xs={12}>
          <RegisterFields />
        </Grid>
        <Grid item container justifyContent='center'>
          <Submit
            data-testid='submit'
            fullWidth
            size='large'
            variant='contained'
            color='primary'
            disabled={isLoading}
          >
            Create an account
          </Submit>
        </Grid>
        <Grid item>
          <VSpacer size={'small'} />
          <Divider />
        </Grid>
        <Grid item>
          <Typography align='center' className={question}>
            Already have an account?{' '}
            <AppRouterLink to={AuthRoute.login} className={link}>
              Sign In.
            </AppRouterLink>
          </Typography>
        </Grid>
        <Grid item>
          <VSpacer size='medium' />
          <Typography align='center' className={support} variant={'body2'}>
            If you have any issues, please contact us{' '}
            <a href={'mailto:support@investax.io'} className={link}>
              support@investax.io
            </a>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  )
})
