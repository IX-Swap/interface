import React, { useState } from 'react'
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Divider
} from '@material-ui/core'
import { useAuth } from 'v2/hooks/auth/useAuth'

import { SettingsRow } from './components/SettingsRow'
import { TwoFaDialog } from './components/TwoFaDialog'

import keyImg from './assets/key.png'
import gAuthImg from './assets/googleauth.png'
import { PageTitle } from 'v2/app/components/PageTitle'

import { useSecurityRouter } from '../../router'

export const Landing = () => {
  const { user = { totpConfirmed: false } } = useAuth()
  const securityRouter = useSecurityRouter()
  const [open, setOpen] = useState(!user.totpConfirmed)

  return (
    <>
      <Container>
        <PageTitle title='Settings' />
        <Box marginTop={5}>
          <Paper elevation={0}>
            <Box p={2}>
              <Typography variant='h6'>Security</Typography>
            </Box>
            <Divider />
            <Container>
              <Grid container alignItems='center' justify='center'>
                <Box width='60%'>
                  <SettingsRow
                    image={gAuthImg}
                    name='Google Authenticator'
                    buttonDisabled={user.totpConfirmed}
                    buttonMessage={user.totpConfirmed ? 'Done' : 'Setup'}
                    buttonClick={() => setOpen(true)}
                  />
                  <SettingsRow
                    image={keyImg}
                    name='Password'
                    buttonDisabled={false}
                    buttonMessage='Change'
                    buttonClick={() => securityRouter.push('changePassword')}
                  />
                </Box>
              </Grid>

              <Grid container alignItems='center' justify='center'>
                <Box width='60%' mt={0} mb={5}>
                  <Grid container alignItems='center' justify='space-between'>
                    <Grid item>
                      <b>Currency</b>
                    </Grid>
                    <Grid item>
                      <Button disabled>SGD</Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Container>
          </Paper>
        </Box>
      </Container>
      <TwoFaDialog
        isOpen={open}
        closeFn={() => setOpen(false)}
        nextFn={() => securityRouter.push('setup2fa')}
      />
    </>
  )
}
