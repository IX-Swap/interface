import React from 'react'
import useStyles from 'auth/styles'
import { registerFormValidationSchema } from 'validation/auth'
import { SignupArgs } from 'types/auth'
import { observer } from 'mobx-react'
import { useSignup } from 'auth/hooks/useSignup'
import { Grid } from '@material-ui/core'
import { Form } from 'components/form/Form'
import { RegisterFields } from 'auth/pages/register/components/RegisterFields'
import { Submit } from 'components/form/Submit'

export const registerFormInitialValues = {
  name: '',
  email: '',
  password: ''
}

export const Register: React.FC = observer(() => {
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
          <RegisterFields />
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
