import React from 'react'
import { Dropdown } from 'v2/app/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'v2/app/components/UserDropdown/UserDropdownTrigger'
import { UserDropdownContent } from 'v2/app/components/UserDropdown/UserDropdownContent'

export const UserDropdown = () => {
  return (
    <Dropdown trigger={UserDropdownTrigger} content={UserDropdownContent} />
  )
}
