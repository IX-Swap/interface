import { ListItemIcon, ListItemText, MenuItem } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import React from 'react'
import { useStyles } from 'v2/app/components/UserDropdown/UserDropdownItem.styles'
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
  const isActive = typeof link === 'string' ? pathname.startsWith(link) : false
  const classes = useStyles()
  const handleClick = () => {
    onClick?.()
    onClose()
  }
  let linkElement: JSX.Element | string

  if (typeof link === 'string') {
    linkElement = <AppRouterLink to={link}>{label}</AppRouterLink>
  } else {
    linkElement = label
  }

  return (
    <MenuItem selected={isActive} onClick={handleClick}>
      <ListItemIcon className={classes.iconWrapper}>
        {React.createElement(icon)}
      </ListItemIcon>
      <ListItemText>{linkElement}</ListItemText>
    </MenuItem>
  )
}
