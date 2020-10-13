import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { queryStatusRenderer } from 'v2/components/form/renderUtils'

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
