import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'
import React from 'react'
import { VirtualAccount } from 'types/virtualAccount'

export const VirtualAccountSelect = (props: Partial<SelectProps>) => {
  const { list } = useVirtualAccount()
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Virtual Account
      </MenuItem>
      {list?.map((item: VirtualAccount) => (
        <MenuItem key={item.accountNumber} value={item.accountNumber}>
          {item.accountNumber}
        </MenuItem>
      ))}
    </Select>
  )
}
