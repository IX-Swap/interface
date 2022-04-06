import React, { useState } from 'react'
import { Box, Collapse } from '@mui/material'
import { TopbarLinkContainer } from 'app/components/NewHeader/components/TopbarLinkContainer/TopbarLinkContainer'

export interface DropdownLinksItems {
  path: string
  label: string
  disabled?: boolean
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

  return (
    <>
      <TopbarLinkContainer
        disabled
        {...rest}
        key={rest.label}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapse in={isOpen}>
        <Box marginLeft={2}>
          {dropdownLinksItems.map(item => (
            <TopbarLinkContainer
              placement={'mobileDropdown'}
              link={item.path}
              label={item.label}
              key={item.label}
              onClick={item.onClick}
            />
          ))}
        </Box>
      </Collapse>
    </>
  )
}
