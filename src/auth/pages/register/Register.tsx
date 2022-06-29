import React, { useEffect } from 'react'
import {
  registerFormValidationSchema,
  singpassFormValidationSchema
} from 'validation/auth'
import { SignupArgs } from 'types/auth'
import { observer } from 'mobx-react'
import { useSignup } from 'auth/hooks/useSignup'
import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { Form } from 'components/form/Form'
import { RegisterFields } from 'auth/pages/register/components/RegisterFields'
import { Submit } from 'components/form/Submit'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'
import { useStyles } from './Register.styles'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useMyInfoAuthorize } from 'hooks/auth/useMyInfoAuthorize'
import { Redirect } from 'react-router-dom'
import { LoadingFullScreen } from 'auth/components/LoadingFullScreen'
import { history } from 'config/history'
import { hasValue } from 'helpers/forms'

export const registerFormInitialValues = {
  isMyInfo: false,
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

  useEffect(() => {
    if (identity === undefined || identity === '') {
      updateFilter('identityType', 'individual')
    }
  }, [identity, updateFilter])

  const handleIdentityChange = () => {
    if (isIndividual) {
      updateFilter('identityType', 'corporate')
      return
    }

    updateFilter('identityType', 'individual')
  }

  const { data, isError, isLoading: authorizeLoading } = useMyInfoAuthorize()
  const isMyInfo = data !== undefined && getFilterValue('code') !== undefined

  const defaultFormValues = isMyInfo
    ? {
        isMyInfo: true,
        email: data?.email,
        phoneNumber: data?.mobileno,
        password: '',
        agree: true
      }
    : registerFormInitialValues

  const handleSubmit = async (values: SignupArgs) => {
    await signup(
      {
        name: values.name ?? 'singpassuser',
        email: values.email,
        singPassLogin: isMyInfo,
        oldEmail: hasValue(data?.email) ? data?.email : 'no@email.com',
        mobileNo: values.phoneNumber,
        oldMobileNo: hasValue(data?.mobileno)
          ? data?.mobileno
          : 'no-old-mobile-no',
        password: values.password,
        accountType: identity?.toLocaleUpperCase()
      },
      isMyInfo
        ? {
            onError: (error: any) => {
              if (
                error?.message ===
                'Sorry but this email address is already taken'
              ) {
                history.push(`${AuthRoute.myinfoError}?errorType=email`)
              }
            }
          }
        : undefined
    )
  }

  if (authorizeLoading) {
    return <LoadingFullScreen />
  }

  if (data?.emailExists === true) {
    return <Redirect to={`${AuthRoute.myinfoError}?errorType=email`} />
  }

  if (isError) {
    return <Redirect to={`${AuthRoute.myinfoError}?errorType=connection`} />
  }

  return (
    <Form
      data-testid='register-form'
      defaultValues={defaultFormValues}
      validationSchema={
        isMyInfo ? singpassFormValidationSchema : registerFormValidationSchema
      }
      onSubmit={handleSubmit}
      criteriaMode='all'
    >
      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography align='center' variant='h3' className={title}>
            Sign up
          </Typography>
          {!isMyInfo ? (
            <Typography
              align='center'
              sx={{ color: 'rgba(255, 255, 255, .5)' }}
            >
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
          ) : null}
        </Grid>
        <Grid item xs={12}>
          <RegisterFields isMyInfo={isMyInfo} />
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
            {isMyInfo ? 'Sign Up' : 'Create an account'}
          </Submit>
        </Grid>
        <Grid item>
          <Box py={3}>
            <Divider />
          </Box>
        </Grid>
        <Grid item>
          <Typography align='center' className={question}>
            Already have an account?{' '}
            <AppRouterLink to={AuthRoute.login} className={link}>
              Log In
            </AppRouterLink>
          </Typography>
        </Grid>
      </Grid>
    </Form>
  )
})
