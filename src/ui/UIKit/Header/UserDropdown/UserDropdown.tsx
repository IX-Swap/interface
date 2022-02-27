import React from 'react'
import { Dropdown } from 'ui/UIKit/Header/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'ui/UIKit/Header/UserDropdown/UserDropdownTrigger/UserDropdownTrigger'
import { UserDropdownContent } from 'ui/UIKit/Header/UserDropdown/UserDropdownContent/UserDropdownContent'

export const UserDropdown = () => {
  return (
    <Dropdown trigger={UserDropdownTrigger} content={UserDropdownContent} />
  )
}
