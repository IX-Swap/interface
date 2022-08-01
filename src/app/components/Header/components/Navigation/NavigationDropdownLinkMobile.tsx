import React, { useState } from 'react'
import { Box, Collapse } from '@mui/material'
import { TopbarLinkContainer } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer'
import { useLocation } from 'react-router-dom'
import { ExternalNavigationLink } from './TopbarLinkContainer/ExternalNavigationLink'

export interface DropdownLinksItems {
  path: string
  label: string
  disabled?: boolean
  external?: boolean
  onClick: () => void
}

export interface NavigationLinkDropdownMobileProps {
  dropdownLinksItems: DropdownLinksItems[]
  link: string
  label: string
}

export const NavigationDropdownLinkMobile = (
  props: NavigationLinkDropdownMobileProps
) => {
  const { dropdownLinksItems, ...rest } = props
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const baseLink = props.link.split('/').slice(0, 3).join('/')
  const isActive = pathname.startsWith(baseLink)

  return (
    <>
      <TopbarLinkContainer
        active={isActive}
        disabled
        {...rest}
        key={rest.label}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapse in={isOpen}>
        <Box marginLeft={2}>
          {dropdownLinksItems.map(item => {
            return item.external === true ? (
              <ExternalNavigationLink
                placement={'mobileDropdown'}
                link={item.path}
                label={item.label}
                key={item.label}
                // onClick={item.onClick}
              />
            ) : (
              <TopbarLinkContainer
                placement={'mobileDropdown'}
                link={item.path}
                label={item.label}
                key={item.label}
              />
            )
          })}
        </Box>
      </Collapse>
    </>
  )
}
