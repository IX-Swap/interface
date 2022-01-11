import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { Copyright } from 'auth/components/Copyright'
import { AuthWrapper } from 'ui/AuthWrapper'
import { InfoPanel } from 'auth/components/InfoPanel'
import { AppLogo } from 'app/components/AppLogo/AppLogo'
import { useStyles } from 'auth/pages/AuthRootStyles.styles'
import { AuthRouter } from 'auth/router/AuthRouter'
import { AppTheme, getAppTheme } from 'themes/new'

export const AuthRoot: React.FC = () => {
  const { container, formContainer } = useStyles()

  return (
    <ThemeProvider theme={getAppTheme(AppTheme.Dark, true)}>
      <Grid
        className={container}
        container
        justifyContent='center'
        alignItems='center'
        alignContent='center'
      >
        <Grid item xs={12}>
          <AuthWrapper
            container
            direction='column'
            justifyContent='center'
            wrap='nowrap'
            spacing={0}
          >
            <Grid item>
              <Grid container spacing={0} style={{ height: '100%' }}>
                <Grid item xs={12} md={7}>
                  <Box className={formContainer}>
                    <Grid container direction='column' spacing={4}>
                      <Grid item>
                        <Grid
                          container
                          justifyContent='center'
                          alignItems='center'
                        >
                          <Grid item>
                            <AppLogo color />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <AuthRouter />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                  <InfoPanel />
                </Grid>
              </Grid>
            </Grid>
          </AuthWrapper>
        </Grid>
        <Grid item xs={12}>
          <Copyright />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
