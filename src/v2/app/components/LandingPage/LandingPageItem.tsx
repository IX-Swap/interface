import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'v2/components/VSpacer'
import React from 'react'
import { useStyles } from 'v2/app/components/LandingPage/LandingPageItem.styles'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { InternalRouteProps } from 'v2/types/util'
import { Noop } from 'v2/components/Noop'

export interface LandingPageItemProps {
  link: InternalRouteProps
}

export const LandingPageItem = (props: LandingPageItemProps) => {
  const {
    link: { path, color = 'black', icon = Noop, label }
  } = props
  const classes = useStyles()

  return (
    <AppRouterLink to={path}>
      <Grid
        container
        item
        direction='column'
        alignItems='center'
        justify='center'
        className={classes.container}
      >
        <Grid item>
          <Box
            className={classes.iconWrapper}
            style={{
              backgroundColor: color
            }}
          >
            {React.createElement(icon)}
          </Box>
        </Grid>
        <VSpacer size='small' />
        <Grid item>
          <Typography className={classes.label} color='textPrimary'>
            {label}
          </Typography>
        </Grid>
      </Grid>
    </AppRouterLink>
  )
}
