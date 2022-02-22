import React from 'react'
import { Dropdown } from 'app/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'ui/UIKit/Header/UserDropdown/UserDropdownTrigger'
import { UserDropdownContent } from 'ui/UIKit/Header/UserDropdown/UserDropdownContent'

export const UserDropdown = () => {
  return (
    <Dropdown trigger={UserDropdownTrigger} content={UserDropdownContent} />
  )
}
