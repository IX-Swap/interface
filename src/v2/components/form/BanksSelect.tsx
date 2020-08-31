import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useBanks } from 'v2/app/accounts/banks/hooks/useBanks'

export const BanksSelect: React.FC<SelectProps> = props => {
  const { status, data } = useBanks()

  if (status === 'loading') {
    return <div>loading...</div>
  }

  if (status === 'error') {
    return <div>error...</div>
  }
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Banks
      </MenuItem>
      {data.list.map(({ _id, bankName, bankAccountNumber }) => (
        <MenuItem key={_id} value={_id}>
          {bankName} – {bankAccountNumber}
        </MenuItem>
      ))}
    </Select>
  )
}
