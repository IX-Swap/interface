import { Box, Button, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { ThemeSelector } from 'app/pages/security/pages/landing/components/ThemeSelector'
import useStyles from 'app/pages/security/pages/landing/Landing.styles'
import { SecurityRoute } from 'app/pages/security/router/config'
import { useAuth } from 'hooks/auth/useAuth'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { RootContainer } from 'ui/RootContainer'
import { SettingsRow } from './components/SettingsRow'
import { ThemeSelectorMobile } from './components/ThemeSelectorMobile'

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

  const { isDesktop } = useAppBreakpoints()
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader styled={false} title='Settings' />
      </Grid>
      <RootContainer>
        <Grid item className={classes.contentWrapper}>
          <Grid
            className={classes.subContent}
            container
            direction='column'
            alignItems='center'
            wrap='wrap'
          >
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
                      {user.totpConfirmed ? 'Update' : 'Connect'}
                    </Button>
                  }
                />
              </Grid>

              <Box className={classes.divider} />

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

              <Box className={classes.divider} />

              <Grid item>
                <SettingsRow
                  name={isDesktop ? 'Application Theme' : 'Dark Mode'}
                  action={
                    isDesktop ? <ThemeSelector /> : <ThemeSelectorMobile />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </RootContainer>
    </Grid>
  )
}
