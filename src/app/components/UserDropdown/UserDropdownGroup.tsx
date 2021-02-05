import React, { Fragment, PropsWithChildren } from 'react'
import { UserDropdownItem } from 'app/components/UserDropdown/UserDropdownItem'
import { Divider } from 'ui/Divider'

export interface UserDropdownGroupProps {
  label: string
  icon: any
}

export const UserDropdownGroup = (
  props: PropsWithChildren<UserDropdownGroupProps>
) => {
  const { label, icon, children } = props

  return (
    <Fragment>
      <UserDropdownItem
        icon={icon}
        label={label}
        onClose={() => {}}
        placeholder
      />

      <Divider />

      {children}
    </Fragment>
  )
}
