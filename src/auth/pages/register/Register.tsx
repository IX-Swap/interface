import React, { useEffect } from 'react'
import { registerFormValidationSchema } from 'validation/auth'
import { SignupArgs } from 'types/auth'
import { observer } from 'mobx-react'
import { useSignup } from 'auth/hooks/useSignup'
import { Button, Divider, Grid, Typography } from '@mui/material'
import { Form } from 'components/form/Form'
import { RegisterFields } from 'auth/pages/register/components/RegisterFields'
import { Submit } from 'components/form/Submit'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'
import { useStyles } from './Register.styles'
import { VSpacer } from 'components/VSpacer'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const registerFormInitialValues = {
  name: '',
  email: '',
  password: '',
  agree: false
}

export const Register: React.FC = observer(() => {
  const [signup, { isLoading }] = useSignup()
  const { title, question, link } = useStyles({})
  const { updateFilter, getFilterValue } = useQueryFilter()
  const identity = getFilterValue('identityType')
  const isIndividual = identity === 'individual'

  const handleSubmit = async (values: SignupArgs) => {
    await signup({
      name: values.name,
      email: values.email,
      password: values.password
    })
  }

  useEffect(() => {
    if (identity === undefined || identity === '') {
      updateFilter('identityType', 'corporate')
    }
  }, [identity, updateFilter])

  const handleIdentityChange = () => {
    if (isIndividual) {
      updateFilter('identityType', 'corporate')
      return
    }

    updateFilter('identityType', 'individual')
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
          <Typography align='center' variant='h3' className={title}>
            Sign up
          </Typography>
          <Typography align='center' sx={{ color: 'rgba(255, 255, 255, .5)' }}>
            Creating {isIndividual ? 'a ' : 'an '}
            <Button
              variant='text'
              onClick={handleIdentityChange}
              disableRipple
              sx={{
                textTransform: 'capitalize',
                color: 'rgba(255,255,255,1)',
                padding: 0,
                ':hover': {
                  backgroundColor: 'transparent'
                }
              }}
            >
              {isIndividual ? 'Corporate' : 'Individual'} Account
            </Button>{' '}
            ?
          </Typography>
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
          <VSpacer size='small' />
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
      </Grid>
    </Form>
  )
})
