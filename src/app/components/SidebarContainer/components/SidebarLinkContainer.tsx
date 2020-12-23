import React from 'react'
import { Box } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import { NavigationLink } from 'ui/Navigation/NavigationLink'
import { useAppActions } from 'app/hooks/useAppState'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { NavigationItem } from 'ui/Navigation/NavigationItem'

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
  const { isTablet, theme } = useAppBreakpoints()
  const color = isActive ? theme.palette.primary.main : theme.palette.grey[400]

  const closeDrawer = () => {
    if (isTablet) {
      setNavDrawerOpened(false)
    }
  }

  return (
    <NavigationItem button selected={isActive}>
      <NavigationLink onClick={closeDrawer} to={link} style={{ color }}>
        <Box>{React.createElement(icon)}</Box>
        <span>{label}</span>
      </NavigationLink>
    </NavigationItem>
  )
}
