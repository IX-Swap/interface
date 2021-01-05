import React, { useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { SettingsRow } from './components/SettingsRow'
import { TwoFaDialog } from './components/TwoFaDialog'
import keyImg from './assets/key.png'
import gAuthImg from './assets/googleauth.png'
import { useSecurityRouter } from '../../router'
import { ThemeSelector } from 'app/pages/security/pages/landing/components/ThemeSelector'

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
              action={
                <Button
                  variant='contained'
                  color='primary'
                  disabled={user.totpConfirmed}
                  onClick={() => setOpen(true)}
                  size='large'
                >
                  {user.totpConfirmed ? 'Done' : 'Setup'}
                </Button>
              }
            />
          </Grid>

          <Grid item>
            <SettingsRow
              image={keyImg}
              name='Password'
              action={
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => securityRouter.push('changePassword')}
                  size='large'
                >
                  Change
                </Button>
              }
            />
          </Grid>

          <Grid item>
            <SettingsRow name='Application Theme' action={<ThemeSelector />} />
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
