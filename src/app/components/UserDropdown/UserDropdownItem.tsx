import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography
} from '@material-ui/core'
import { AppRouterLink } from 'components/AppRouterLink'
import React, { createElement } from 'react'
import { useStyles } from 'app/components/UserDropdown/UserDropdownItem.styles'
import { useLocation } from 'react-router-dom'

export interface UserDropdownItemProps {
  icon: any
  label: string
  onClose: () => any
  link?: string | (() => any)
  onClick?: () => any
}

export const UserDropdownItem = (props: UserDropdownItemProps) => {
  const { icon, label, link, onClick, onClose } = props
  const { pathname } = useLocation()
  const isActive = typeof link === 'string' && pathname.startsWith(link)
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
      onClick={handleClick}
      to={link}
    >
      <ListItemIcon className={classes.iconWrapper}>{iconElement}</ListItemIcon>
      <ListItemText>
        <Typography color='textSecondary'>{label}</Typography>
      </ListItemText>
    </MenuItem>
  )
}
