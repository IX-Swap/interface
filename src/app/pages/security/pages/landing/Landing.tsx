import React, { useState } from 'react'
import { Grid } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { SettingsRow } from './components/SettingsRow'
import { TwoFaDialog } from './components/TwoFaDialog'
import keyImg from './assets/key.png'
import gAuthImg from './assets/googleauth.png'
import { useSecurityRouter } from '../../router'

export const Landing = () => {
  const { user = { totpConfirmed: false } } = useAuth()
  const securityRouter = useSecurityRouter()
  const [open, setOpen] = useState(!user.totpConfirmed)

  return (
    <>
      <Grid container direction='column' alignItems='center' wrap='wrap'>
        <Grid container direction='column' item xs={10} sm={8} md={6} lg={4}>
          <Grid item>
            <SettingsRow
              image={gAuthImg}
              name='Google Authenticator'
              buttonDisabled={user.totpConfirmed}
              buttonMessage={user.totpConfirmed ? 'Done' : 'Setup'}
              buttonClick={() => setOpen(true)}
            />
          </Grid>

          <Grid item>
            <SettingsRow
              image={keyImg}
              name='Password'
              buttonDisabled={false}
              buttonMessage='Change'
              buttonClick={() => securityRouter.push('changePassword')}
            />
          </Grid>
        </Grid>
      </Grid>
      <TwoFaDialog
        isOpen={open}
        closeFn={() => setOpen(false)}
        nextFn={() => securityRouter.push('setup2fa')}
      />
    </>
  )
}
