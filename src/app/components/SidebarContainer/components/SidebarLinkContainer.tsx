import React from 'react'
import { Box } from '@material-ui/core'
import { Link, useLocation } from 'react-router-dom'
import { SidebarLink } from 'ui/SidebarLink'
import { useAppActions } from 'app/hooks/useAppState'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface SidebarLinkProps {
  link: string
  icon: any
  label: string
}

export const SidebarLinkContainer = (props: SidebarLinkProps) => {
  const { link, icon, label } = props
  const { pathname } = useLocation()
  const isActive = pathname.startsWith(link)
  const { setNavDrawerOpened } = useAppActions()
  const { isTablet } = useAppBreakpoints()

  const closeDrawer = () => {
    if (isTablet) {
      setNavDrawerOpened(false)
    }
  }

  return (
    <SidebarLink
      onClick={closeDrawer}
      selected={isActive}
      component={Link}
      disableRipple
      to={link}
      button
    >
      <Box>{React.createElement(icon)}</Box>
      <span>{label}</span>
    </SidebarLink>
  )
}
