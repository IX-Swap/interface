import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import { AppRouterLink } from 'components/AppRouterLink'
import React, { createElement } from 'react'
import { useStyles } from 'app/components/NewHeader/components/UserDropdown/UserDropdownItem/UserDropdownItem.styles'
import { useLocation } from 'react-router-dom'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'app/router/config'

export interface UserDropdownItemProps {
  icon: any
  label: string
  onClose: () => any
  link?: string
  onClick?: () => any
}

export const getIsLinkActive = (link: string, pathname: string) => {
  if (pathname.startsWith(AppRoute.admin)) {
    if (pathname === AdminRoute.accessReports) {
      return link === pathname
    }
  }

  return pathname.startsWith(link)
}

export const UserDropdownItem = (props: UserDropdownItemProps) => {
  const { icon, label, link, onClick, onClose } = props
  const { pathname } = useLocation()
  const isActive = link !== undefined && getIsLinkActive(link, pathname)
  const classes = useStyles()
  const handleClick = () => {
    onClick?.()
    onClose()
  }
  const iconElement = createElement(icon, { className: classes.icon })
  const LinkElement = (linkProps: any) => (
    <AppRouterLink {...linkProps} role='menuitem' />
  )

  return (
    <MenuItem
      component={typeof link === 'string' ? LinkElement : 'li'}
      selected={isActive}
      disableTouchRipple
      onClick={handleClick}
      className={classes.wrapper}
      to={link}
    >
      <ListItemIcon className={classes.iconWrapper}>{iconElement}</ListItemIcon>
      <ListItemText>
        <Typography
          variant='body1'
          color='textPrimary'
          style={{ fontWeight: 400 }}
        >
          {label}
        </Typography>
      </ListItemText>
    </MenuItem>
  )
}
