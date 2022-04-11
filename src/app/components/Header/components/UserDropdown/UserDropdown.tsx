import React from 'react'
import { Dropdown } from 'app/components/Header/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'app/components/Header/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger'
import { UserDropdownContent } from 'app/components/Header/components/UserDropdown/UserDropdownContent/UserDropdownContent'

export const UserDropdown = () => {
  return (
    <Dropdown trigger={UserDropdownTrigger} content={UserDropdownContent} />
  )
}
