import React from 'react'
import { registerFormValidationSchema } from 'validation/auth'
import { SignupArgs } from 'types/auth'
import { observer } from 'mobx-react'
import { useSignup } from 'auth/hooks/useSignup'
import { Grid, Typography } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { RegisterFields } from 'auth/pages/register/components/RegisterFields'
import { Submit } from 'components/form/Submit'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'

export const registerFormInitialValues = {
  name: '',
  email: '',
  password: '',
  agree: false
}

export const Register: React.FC = observer(() => {
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
          <Typography align='center'>
            Please fill in all the details to create a new account.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <RegisterFields />
        </Grid>
        <Grid item container justifyContent='center'>
          <Submit
            data-testid='submit'
            style={{ width: 150 }}
            size='large'
            variant='contained'
            color='primary'
            disabled={isLoading}
          >
            Create
          </Submit>
        </Grid>
        <Grid item>
          <Typography align='center'>
            Already have an account?{' '}
            <AppRouterLink to={AuthRoute.login}>Log In.</AppRouterLink>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  )
})
