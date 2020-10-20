import React, { useEffect } from 'react'
import { Box, Button, CircularProgress, Grid } from '@material-ui/core'
import useStyles from 'v2/auth/styles'
import { useAuthRouter } from 'v2/auth/router'
import { useVerifySignup } from 'v2/auth/hooks/useVerifySignup'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

export const Confirmation: React.FC = () => {
  const classes = useStyles()
  const { paths, query, push } = useAuthRouter()
  const [verifySignup, { isLoading }] = useVerifySignup()
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
        <Box mt={4}>
          <Button
            component={AppRouterLinkComponent}
            variant='contained'
            to={paths.login}
          >
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
