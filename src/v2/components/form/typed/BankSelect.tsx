import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useBanksData } from 'v2/app/pages/accounts/pages/banks/hooks/useBanksData'
import { queryStatusRenderer } from 'v2/components/form/typed/renderUtils'

export const BankSelect = (props: any): JSX.Element => {
  const { data, status } = useBanksData()

  queryStatusRenderer(status)

  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Bank
      </MenuItem>
      {data.list.map(({ _id, bankName, bankAccountNumber }) => (
        <MenuItem key={_id} value={_id}>
          {bankName} – {bankAccountNumber}
        </MenuItem>
      ))}
    </Select>
  )
}
