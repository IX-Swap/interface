import React from 'react'
import useStyles from 'v2/auth/styles'
import { registerFormValidationSchema } from 'v2/auth/validation'
import { SignupArgs } from 'v2/types/auth'
import { observer } from 'mobx-react'
import { useSignup } from 'v2/auth/hooks/useSignup'
import { createTypedForm } from 'v2/components/form/createTypedForm'
import { Grid } from '@material-ui/core'

export const useRegisterForm = createTypedForm<SignupArgs>()

export const registerFormInitialValues = {
  name: '',
  email: '',
  password: ''
}

export const Register: React.FC = observer(() => {
  const { Form, TextField, Submit } = useRegisterForm()
  const [signup] = useSignup()
  const classes = useStyles()
  const handleSubmit = async (values: SignupArgs) => {
    await signup(values)
  }

  return (
    <>
      <Form
        data-testid='register-form'
        defaultValues={registerFormInitialValues}
        validationSchema={registerFormValidationSchema}
        onSubmit={handleSubmit}
      >
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <TextField name='name' label='Name' />
          </Grid>
          <Grid item>
            <TextField
              name='email'
              label='Email Address'
              inputProps={{
                type: 'email'
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              name='password'
              label='Password'
              inputProps={{
                type: 'password'
              }}
            />
          </Grid>
          <Grid item>
            <div className={classes.creatingButtonContainer}>
              <Submit
                size='large'
                variant='contained'
                color='primary'
                fullWidth
              >
                Create
              </Submit>
            </div>
          </Grid>
        </Grid>
      </Form>
    </>
  )
})
