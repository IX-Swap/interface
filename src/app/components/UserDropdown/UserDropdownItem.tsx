import {
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography
} from '@mui/material'
import { AppRouterLink } from 'components/AppRouterLink'
import React, { createElement } from 'react'
import { useStyles } from 'app/components/UserDropdown/UserDropdownItem.styles'
import { useLocation } from 'react-router-dom'
import { LIST_HORIZONTAL_PADDING } from 'app/components/UserDropdown/UserDropdownContent'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'app/router/config'

export interface UserDropdownItemProps {
  icon: any
  label: string
  onClose: () => any
  link?: string | (() => any)
  onClick?: () => any
  placeholder?: boolean
  level?: number
}

export const LEVEL_INSET = 20

export const getIsLinkActive = (link: string, pathname: string) => {
  if (pathname.startsWith(AppRoute.admin)) {
    if (pathname === AdminRoute.accessReports) {
      return link === pathname
    }
  }

  return pathname.startsWith(link)
}

export const UserDropdownItem = (props: UserDropdownItemProps) => {
  const {
    icon,
    label,
    link,
    onClick,
    onClose,
    placeholder = false,
    level = 0
  } = props
  const { pathname } = useLocation()
  const isActive = typeof link === 'string' && getIsLinkActive(link, pathname)
  const classes = useStyles()
  const handleClick = () => {
    onClick?.()
    onClose()
  }
  const iconElement = createElement(icon, { className: classes.icon })
  const LinkElement = (linkProps: any) => (
    <AppRouterLink {...linkProps} role='menuitem' />
  )
  const Wrapper: any = placeholder ? ListItem : MenuItem

  return (
    <Wrapper
      component={typeof link === 'string' ? LinkElement : 'li'}
      selected={isActive}
      onClick={handleClick}
      to={link}
      style={{
        marginLeft: -LIST_HORIZONTAL_PADDING,
        marginRight: -LIST_HORIZONTAL_PADDING,
        paddingLeft: LIST_HORIZONTAL_PADDING + level * LEVEL_INSET,
        paddingRight: LIST_HORIZONTAL_PADDING
      }}
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
    </Wrapper>
  )
}
