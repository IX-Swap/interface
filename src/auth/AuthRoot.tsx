import React from 'react'
import { ReactComponent as AppLogo } from 'assets/icons/new_app_logo.svg'
import { useStyles } from 'auth/pages/AuthRootStyles.styles'
import { AuthRouter } from 'auth/router/AuthRouter'
import { Box, Grid } from '@material-ui/core'

export const AuthRoot: React.FC = () => {
  const {
    container,
    wrapper,
    formContainer,
    background,
    backgroundImage,
    formWrapper,
    logo
  } = useStyles()

  return (
    <Grid className={container} container>
      <Grid item className={wrapper}>
        <Grid
          className={formWrapper}
          container
          direction={'column'}
          alignItems={'stretch'}
        >
          <Box className={logo}>
            <AppLogo />
          </Box>
          <Grid item className={formContainer}>
            <AuthRouter />
          </Grid>
        </Grid>
      </Grid>
      <Box className={background}>
        <Box className={backgroundImage} />
      </Box>
    </Grid>
  )
}
