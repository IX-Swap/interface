import React from 'react'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

export const Page404 = () => {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='body1'>Page Not Found</Typography>
        </Grid>
        <Grid item>
          <Button component={AppRouterLinkComponent} to='/'>
            Go to the home page
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
