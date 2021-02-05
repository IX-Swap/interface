import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { Copyright } from 'auth/components/Copyright'
import { useAuthRouter } from 'auth/router'
import { AuthWrapper } from 'ui/AuthWrapper'
import { InfoPanel } from 'auth/components/InfoPanel'
import { AppLogo } from 'app/components/AppLogo/AppLogo'
import { useStyles } from 'auth/pages/AuthRootStyles.styles'

export const AuthRoot: React.FC = () => {
  const { renderRoutes } = useAuthRouter()
  const { container, formContainer } = useStyles()

  return (
    <Grid className={container} container justify='center' alignItems='center'>
      <Grid item xs={12}>
        <AuthWrapper
          container
          direction='column'
          justify='center'
          wrap='nowrap'
          spacing={0}
        >
          <Grid item>
            <Grid container spacing={0} style={{ height: '100%' }}>
              <Grid item xs={12} md={7}>
                <Box className={formContainer}>
                  <Grid container direction='column' spacing={4}>
                    <Grid item>
                      <Grid container justify='center' alignItems='center'>
                        <Grid item>
                          <AppLogo color />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>{renderRoutes()}</Grid>
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
      <Copyright />
    </Grid>
  )
}
