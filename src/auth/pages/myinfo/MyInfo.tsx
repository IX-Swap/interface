import { Box, Button, Grid, Typography } from '@mui/material'
import { RetrieveButton } from 'auth/pages/register/components/SingPass/SingPassDialog/RetrieveButton'
import React from 'react'
import { Divider } from 'ui/Divider'
import { AuthRoute } from 'auth/router/config'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Redirect } from 'react-router-dom'
import { Icon } from 'ui/Icons/Icon'

export const MyInfo = () => {
  const { getFilterValue } = useQueryFilter()
  const errorType = getFilterValue<'errorType'>('errorType')

  if (errorType === undefined) {
    return <Redirect to={AuthRoute.signup} />
  }

  const errorMap = {
    email: {
      title: 'Email  Already  Exists',
      message:
        'You have already used this email to sign up on our platform. Please try again with another email.',
      action: (
        <Grid container spacing={2} justifyContent='space-between'>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant='outlined'
              href={AuthRoute.signup}
              startIcon={<Icon name='arrow-left' color='#FFF' />}
            >
              <Typography color='#FFF'>Back to Sign Up</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant='contained' href={AuthRoute.login}>
              Sign In
            </Button>
          </Grid>
        </Grid>
      )
    },
    connection: {
      title: 'Connection  Failed',
      message:
        'We are unable to retrieve your information from Singpass. Proceed with your application once again.',
      action: <RetrieveButton label='Try Again' hideCheckBox />
    }
  }

  return (
    <Box width='100%' maxWidth={480}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography
            align='center'
            variant='h2'
            textTransform='uppercase'
            fontFamily='Clash Display'
            fontSize={32}
            fontWeight={700}
            lineHeight='39px'
          >
            {errorMap[errorType].title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            align='center'
            variant='body1'
            fontSize={16}
            lineHeight='19px'
          >
            {errorMap[errorType].message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {errorMap[errorType].action}
        </Grid>
      </Grid>
    </Box>
  )
}
