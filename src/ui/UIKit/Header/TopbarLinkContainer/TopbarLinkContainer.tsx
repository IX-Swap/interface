import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Typography } from '@mui/material'
import { useStyles } from 'ui/UIKit/Header/TopbarLinkContainer/TopbarLinkContainer.styles'

export interface TopbarLinkProps {
  link: string
  label: string
  disabled?: boolean
}

export const TopbarLinkContainer = (props: TopbarLinkProps) => {
  const { link, label, disabled = false } = props
  const { pathname } = useLocation()

  const baseLink = link.split('/').slice(0, 3).join('/')
  const isActive = pathname.startsWith(baseLink)
  const classes = useStyles({ isActive, disabled })

  return (
    <Link
      to={link}
      className={classes.wrapper}
      onClick={e => (disabled ? e.preventDefault() : null)}
    >
      <Typography variant={'body1'}>{label}</Typography>
      {disabled ? <ArrowDropDownIcon /> : null}
    </Link>
  )
}
