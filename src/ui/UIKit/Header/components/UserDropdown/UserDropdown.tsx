import React from 'react'
import { Dropdown } from 'ui/UIKit/Header/components/Dropdown/Dropdown'
import { UserDropdownTrigger } from 'ui/UIKit/Header/components/UserDropdown/UserDropdownTrigger/UserDropdownTrigger'
import { UserDropdownContent } from 'ui/UIKit/Header/components/UserDropdown/UserDropdownContent/UserDropdownContent'

export const UserDropdown = () => {
  return (
    <Dropdown trigger={UserDropdownTrigger} content={UserDropdownContent} />
  )
}
