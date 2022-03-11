import React from 'react'
import { MenuItem, Select } from '@mui/material'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { queryStatusRenderer } from 'components/form/renderUtils'

export const BalanceSelect = (props: any): JSX.Element => {
  const { status, data } = useAllBalances()

  queryStatusRenderer(status)

  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Balance
      </MenuItem>
      {data.list.map(({ assetId, symbol, name }) => (
        <MenuItem key={assetId} value={assetId}>
          {name} ({symbol})
        </MenuItem>
      ))}
    </Select>
  )
}
