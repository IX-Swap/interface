import React from 'react'
import { Box } from '@mui/material'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { TopbarLinkDropdown } from 'app/components/Header/components/Navigation/TopbarLinkDropdown/TopbarLinkDropdown'
import { TopbarLinkContainer } from 'app/components/Header/components/Navigation/TopbarLinkContainer/TopbarLinkContainer'
import { useAppNavigationLinks } from 'app/components/Header/hooks/useAppNavigationLinks'

export const Navigation = () => {
  const { isDesktop } = useAppBreakpoints()
  const { links, dropdownLinksItems, isDropdownLink } = useAppNavigationLinks()

  if (!isDesktop) {
    return null
  }

  return (
    <Box display={'flex'} alignItems={'center'}>
      {links.map(link => {
        if (isDropdownLink(link.label)) {
          return (
            <TopbarLinkDropdown
              key={link.label}
              link={link.link}
              label={link.label}
              linkItems={dropdownLinksItems(link.label)}
            />
          )
        }
        return (
          <TopbarLinkContainer
            placement={'topbar'}
            {...link}
            key={link.label}
          />
        )
      })}
    </Box>
  )
}
