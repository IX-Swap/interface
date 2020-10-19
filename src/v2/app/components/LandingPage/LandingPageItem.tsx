import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from '../../../components/VSpacer'
import React from 'react'
import { useStyles } from './LandingPageItem.styles'
import { AppRouterLink } from '../../../components/AppRouterLink'
import { InternalRouteProps } from '../../../types/util'
import { Noop } from '../../pages/identity/components/dataroom/Dataroom'

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
