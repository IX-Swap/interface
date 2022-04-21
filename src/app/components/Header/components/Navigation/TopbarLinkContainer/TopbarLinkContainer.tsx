import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Typography } from '@mui/material'
import { useStyles } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer.styles'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'

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
    <TwoFADialogWrapper>
      {({ enable2Fa, showDialog }) => (
        <Link
          to={link}
          className={classes.wrapper}
          onClick={e => {
            if (
              (link === IssuanceRoute.create ||
                link === OTCMarketRoute.createListing) &&
              enable2Fa !== true
            ) {
              e.preventDefault()
              showDialog()
            } else {
              handleClick(e)
            }
          }}
        >
          <Typography className={classes.text} variant={'body1'}>
            {label}
          </Typography>
          {disabled ? <ArrowDropDownIcon className={classes.icon} /> : null}
        </Link>
      )}
    </TwoFADialogWrapper>
  )
}
