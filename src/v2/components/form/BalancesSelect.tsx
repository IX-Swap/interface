import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useAllBalances } from 'v2/context/balances/useAllBalances'

export const BalancesSelect: React.FC<SelectProps> = props => {
  const { status, data } = useAllBalances()

  if (status === 'loading') {
    return <div>loading...</div>
  }

  if (status === 'error') {
    return <div>error...</div>
  }
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Balances
      </MenuItem>
      {data.list.map(({ _id, symbol, name }) => (
        <MenuItem key={_id} value={_id}>
          {name} ({symbol})
        </MenuItem>
      ))}
    </Select>
  )
}
