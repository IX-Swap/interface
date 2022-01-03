import React from 'react'
import { Box, Card, Grid, Typography } from '@material-ui/core'
import { ReactComponent as CreateProfile } from 'assets/images/create-profile.svg'

export const NoIdentityCard = () => {
  return (
    <Card elevation={0}>
      <Box p={5}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={6}
            container
            alignContent='center'
            justifyContent='center'
          >
            <Grid item>
              <CreateProfile style={{ maxWidth: '100%' }} />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            container
            alignContent='center'
            justifyContent='center'
          >
            <Grid item>
              <Typography variant='h5' align='center'>
                You have not created any identity yet.
              </Typography>
              <Typography align='center'>Let’s create your profile.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}
