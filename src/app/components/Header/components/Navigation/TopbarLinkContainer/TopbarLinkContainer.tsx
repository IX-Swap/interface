import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Typography } from '@mui/material'
import { useStyles } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer.styles'
import { TwoFADialogWrapper } from 'app/components/TwoFADialogWrapper'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { useUncompletedIdentityDialog } from 'app/components/UncompletedIdentityDialog/hook/useUncompletedIdentityDialog'
import { useAppNavigation } from 'app/components/Header/hooks/useAppNavigation'

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

  const { isNavigationPossibleWithoutCompletedIdentity } = useAppNavigation()
  const { showUncompletedIdentityDialog } = useUncompletedIdentityDialog(link)

  const getIsLinkActive = () => {
    if (placement === 'topbar') {
      return pathname.startsWith(baseLink)
    }

    // This check is needed because the pathname that contains the 'exchange' also contains pairId
    if (link.includes('exchange') && pathname.includes('exchange')) {
      return true
    }

    return pathname === link
  }
  const isActive = getIsLinkActive()

  const classes = useStyles({
    isActive: active || isActive,
    disabled,
    placement
  })

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || isNavigationPossibleWithoutCompletedIdentity(link)) {
      e.preventDefault()
      !disabled && showUncompletedIdentityDialog()
    }

    if (onClick !== undefined) {
      onClick()
    }
  }

  return (
    <TwoFADialogWrapper
      extraCheck={
        link === IssuanceRoute.create || link === IssuanceRoute.createListing
      }
    >
      <Link to={link} className={classes.wrapper} onClick={handleClick}>
        <Typography className={classes.text} variant={'body1'}>
          {label}
        </Typography>
        {disabled ? <ArrowDropDownIcon className={classes.icon} /> : null}
      </Link>
    </TwoFADialogWrapper>
  )
}
