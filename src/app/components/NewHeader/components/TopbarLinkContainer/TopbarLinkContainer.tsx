import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Typography } from '@mui/material'
import { useStyles } from 'app/components/NewHeader/components/TopbarLinkContainer/TopbarLinkContainer.styles'

export interface TopbarLinkProps {
  link: string
  label: string
  disabled?: boolean
  placement?: 'topbar' | 'dropdown' | 'mobileDropdown'
  active?: boolean
  onClick?: () => void
}

export const TopbarLinkContainer = (props: TopbarLinkProps) => {
  const {
    link,
    label,
    disabled = false,
    placement = 'dropdown',
    active = false,
    onClick
  } = props
  const { pathname } = useLocation()
  const baseLink = link.split('/').slice(0, 3).join('/')
  const isActive =
    placement === 'topbar' ? pathname.startsWith(baseLink) : pathname === link

  const classes = useStyles({
    isActive: active || isActive,
    disabled,
    placement
  })

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault()
    }
    if (onClick !== undefined) {
      onClick()
    }
  }

  return (
    <Link to={link} className={classes.wrapper} onClick={handleClick}>
      <Typography className={classes.text} variant={'body1'}>
        {label}
      </Typography>
      {disabled ? <ArrowDropDownIcon className={classes.icon} /> : null}
    </Link>
  )
}
