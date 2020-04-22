import React from 'react'
import { withRouter } from 'react-router-dom'
import { Grid, Card, Box, Typography, Divider } from '@material-ui/core'
import Setup2fa from './components/Setup2fa'
import ChangePassword from './components/ChangePassword'
import { IdentityProvider } from '../../context/IdentityContext'

function Security (props) {
  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item md={9} lg={9}>
        <Card>
          <Box p={3}>
            <Box m={2}>
              <Typography variant='h2'>Security</Typography>
            </Box>
          </Box>
          <Box mb={4}>
            <Divider />
          </Box>
          <Box p={3}>
            <IdentityProvider>
              <Box p={2}>
                <Typography variant='h4'>
                  Setup Two Factor Authentication
                </Typography>
                <Setup2fa />
              </Box>
              <Box p={2}>
                <Typography variant='h4'>Change Password</Typography>
                <ChangePassword />
              </Box>
            </IdentityProvider>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}

export default withRouter(Security)
