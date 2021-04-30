import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useVirtualAccounts } from 'app/pages/accounts/hooks/useVirtualAccounts'
import React from 'react'
import { VirtualAccount } from 'types/virtualAccount'

export const VirtualAccountSelect = (props: Partial<SelectProps>) => {
  const { list } = useVirtualAccounts()
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
