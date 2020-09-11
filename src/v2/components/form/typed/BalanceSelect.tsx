import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { queryStatusRenderer } from 'v2/components/form/typed/renderUtils'

export const BalanceSelect = (props: any): JSX.Element => {
  const { status, data } = useAllBalances()

  queryStatusRenderer(status)

  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Balance
      </MenuItem>
      {data.list.map(({ _id, symbol, name }) => (
        <MenuItem key={_id} value={_id}>
          {name} ({symbol})
        </MenuItem>
      ))}
    </Select>
  )
}
