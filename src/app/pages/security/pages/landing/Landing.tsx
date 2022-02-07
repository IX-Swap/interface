import React from 'react'
import { Button, Grid } from '@mui/material'
import { useAuth } from 'hooks/auth/useAuth'
import { SettingsRow } from './components/SettingsRow'
import { ThemeSelector } from 'app/pages/security/pages/landing/components/ThemeSelector'
import { useHistory } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import useStyles from './Landing.style'
import { VSpacer } from 'components/VSpacer'

export const Landing = () => {
  const { user = { totpConfirmed: false } } = useAuth()
  const classes = useStyles()
  const { push } = useHistory()
  const handleUpdate2FA = () => {
    if (user.totpConfirmed) {
      push(SecurityRoute.change2fa)
    } else {
      push(SecurityRoute.setup2fa)
    }
  }

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Settings' />
      </Grid>

      <Grid item className={classes.contentWrapper}>
        <Grid container direction='column' alignItems='center' wrap='wrap'>
          <Grid container direction='column' item>
            <Grid item>
              <SettingsRow
                name='2FA Authenticator'
                action={
                  <Button
                    variant='text'
                    color='primary'
                    onClick={handleUpdate2FA}
                    size='large'
                  >
                    Update
                  </Button>
                }
              />
            </Grid>
            <VSpacer size={'small'} />

            <Grid item>
              <SettingsRow
                name='Password'
                action={
                  <Button
                    variant='text'
                    color='primary'
                    onClick={() => push(SecurityRoute.changePassword)}
                    size='large'
                  >
                    Update
                  </Button>
                }
              />
            </Grid>
            <VSpacer size={'small'} />

            <Grid item>
              <SettingsRow
                name='Application Theme'
                action={<ThemeSelector />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
