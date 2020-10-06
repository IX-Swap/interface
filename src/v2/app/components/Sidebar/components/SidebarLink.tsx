import React from 'react'
import { Box, Grid, ListItem, Typography } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import useStyles from './SidebarLink.styles'
import classNames from 'classnames'

export interface SidebarLinkProps {
  link: string
  icon: any
  label: string
}

export const SidebarLink = (props: SidebarLinkProps) => {
  const { link, icon, label } = props
  const { pathname } = useLocation()
  const classes = useStyles()
  const isActive = pathname.startsWith(link)

  return (
    <ListItem
      component={Link}
      className={classNames(classes.link, { [classes.active]: isActive })}
      disableRipple
      to={link}
      button
    >
      <Grid container direction='column' alignItems='center'>
        <Box>{React.createElement(icon, { className: classes.icon })}</Box>
        <Typography variant='subtitle2'>{label}</Typography>
      </Grid>
    </ListItem>
  )
}
