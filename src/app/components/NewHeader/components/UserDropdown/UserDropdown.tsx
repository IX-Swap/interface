import React from 'react'
import { Dropdown } from 'app/components/NewHeader/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'app/components/NewHeader/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger'
import { UserDropdownContent } from 'app/components/NewHeader/components/UserDropdown/UserDropdownContent/UserDropdownContent'

export const UserDropdown = () => {
  return (
    <Dropdown trigger={UserDropdownTrigger} content={UserDropdownContent} />
  )
}
