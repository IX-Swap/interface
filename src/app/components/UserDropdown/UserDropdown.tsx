import React from 'react'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'app/components/UserDropdown/UserDropdownTrigger'
import { UserDropdownContent } from 'app/components/UserDropdown/UserDropdownContent'

export const UserDropdown = () => {
  return (
    <Dropdown trigger={UserDropdownTrigger} content={UserDropdownContent} />
  )
}
