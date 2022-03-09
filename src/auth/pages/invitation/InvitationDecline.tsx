import React, { Fragment, useEffect, useState } from 'react'
import { Divider, Grid, Typography, Button } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { useStyles } from './InvitationDecline.styles'
import InvestaLogo from 'assets/icons/logo-color.svg'
import { useInvitation } from 'auth/hooks/useInvitation'
import { AppRouterLink } from 'components/AppRouterLink'
import { AuthRoute } from 'auth/router/config'
import { useParams } from 'react-router-dom'

export const InvitationDeclie = () => {
  const { roleId } = useParams<{
    roleId: string
  }>()
  const { wrapper, description, customButton, text } = useStyles()
  const [decline, { isSuccess, isError }] = useInvitation(roleId)
  const [state, setState] = useState({
    message: 'Are you sure you want to decline the invitation?',
    btnTxt: 'Yes, Decline'
  })
  useEffect(() => {
    isError &&
      setState({
        ...state,
        message: 'Something went wrong. Could not decline the invitation',
        btnTxt: 'Try Again'
      })
  }, [isError]) // eslint-disable-line

  const handleSubmit = async () => {
    await decline()
  }

  return (
    <Grid container className={wrapper}>
      <Grid item>
        <img alt='logo' src={InvestaLogo} />
        <VSpacer size={'medium'} />
      </Grid>
      {!isSuccess && (
        <Fragment>
          <Grid item>
            <Typography
              className={description}
              variant={'body1'}
              align='center'
            >
              {state.message}
            </Typography>
            <VSpacer size={'medium'} />
          </Grid>
          <Grid item>
            <Divider />
            <VSpacer size={'small'} />
          </Grid>
          <Grid item>
            <Button
              className={customButton}
              size='large'
              onClick={handleSubmit}
            >
              {state.btnTxt}
            </Button>
          </Grid>
        </Fragment>
      )}
      {isSuccess && (
        <Fragment>
          <Grid item>
            <Typography align='center' className={text}>
              Don’t have an account?{' '}
              <AppRouterLink to={AuthRoute.signup}>
                Create an Account.
              </AppRouterLink>
            </Typography>
          </Grid>
          <br />
          <Grid item>
            <Typography align='center' className={text}>
              Already have an account?{' '}
              <AppRouterLink to={AuthRoute.login}>Sign In.</AppRouterLink>
            </Typography>
          </Grid>
        </Fragment>
      )}
    </Grid>
  )
}
