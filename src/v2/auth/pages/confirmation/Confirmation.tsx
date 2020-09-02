import React, { useEffect } from 'react'
import { Box, Button, CircularProgress, Grid } from '@material-ui/core'
import useStyles from 'v2/auth/styles'
import { useAuthRouter } from 'v2/auth/router'
import { useUserStore } from 'v2/auth/context'
import { AuthFormMessage } from 'v2/auth/components/AuthFormMessage'

export const Confirmation: React.FC = () => {
  const { push, query } = useAuthRouter()
  const { verifySignup, isLoading } = useUserStore()
  const classes = useStyles()
  const backToLogin = (): void => push('login')
  let content: JSX.Element

  useEffect(() => {
    const token = query.get('token')

    if (token !== null) {
      // eslint-disable-next-line no-void
      void verifySignup({ verificationToken: token })
      push('confirm')
    }
  }, [query, verifySignup, push])

  if (isLoading) {
    content = <CircularProgress data-testid='loading' size={26} />
  } else {
    content = (
      <Box mt={4}>
        <AuthFormMessage />
        <Box mt={4}>
          <Button variant='outlined' onClick={backToLogin}>
            Back to Login
          </Button>
        </Box>
      </Box>
    )
  }

  return (
    <Grid container className={classes.container}>
      <Grid container justify='center' alignItems='center'>
        {content}
      </Grid>
    </Grid>
  )
}
