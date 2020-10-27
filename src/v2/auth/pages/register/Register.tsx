import React from 'react'
import useStyles from 'v2/auth/styles'
import { registerFormValidationSchema } from 'v2/validation/auth'
import { SignupArgs } from 'v2/types/auth'
import { observer } from 'mobx-react'
import { useSignup } from 'v2/auth/hooks/useSignup'
import { Grid } from '@material-ui/core'
import { Form } from 'v2/components/form/Form'
import { RegisterFields } from 'v2/auth/pages/register/components/RegisterFields'
import { Submit } from 'v2/components/form/Submit'

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
