import { Box, Grid, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { useStyles } from 'app/components/LandingPage/LandingPageItem.styles'
import { AppRouterLink } from 'components/AppRouterLink'
import { InternalRouteProps } from 'types/util'
import { Noop } from 'components/Noop'

export interface LandingPageItemProps {
  link: InternalRouteProps
  variant?: number
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
        justifyContent='flex-start'
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
