import React, { useState } from 'react'
import { Button, Grid } from '@material-ui/core'
import { useAuth } from 'hooks/auth/useAuth'
import { SettingsRow } from './components/SettingsRow'
import { TwoFaDialog } from './components/TwoFaDialog'
import keyImg from './assets/key.png'
import gAuthImg from './assets/googleauth.png'
import { ThemeSelector } from 'app/pages/security/pages/landing/components/ThemeSelector'
import { useHistory } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const Landing = () => {
  const { user = { totpConfirmed: false } } = useAuth()
  const [open, setOpen] = useState(!user.totpConfirmed)
  const { push } = useHistory()

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Settings' />
      </Grid>

      <Grid item>
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
                    onClick={() => push(SecurityRoute.changePassword)}
                    size='large'
                  >
                    Change
                  </Button>
                }
              />
            </Grid>

            <Grid item>
              <SettingsRow
                name='Application Theme'
                action={<ThemeSelector />}
              />
            </Grid>
          </Grid>
        </Grid>
        <TwoFaDialog
          isOpen={open}
          closeFn={() => setOpen(false)}
          nextFn={() => push(SecurityRoute.setup2fa)}
        />
      </Grid>
    </Grid>
  )
}
