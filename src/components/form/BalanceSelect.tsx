import React from 'react'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { queryStatusRenderer } from 'components/form/renderUtils'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const BalanceSelect = (props: any): JSX.Element => {
  const { status, data } = useAllBalances()

  queryStatusRenderer(status)

  return (
    <Select {...props}>
      <SelectItem disabled value={undefined}>
        Balance
      </SelectItem>
      {data.list.map(({ assetId, symbol, name }) => (
        <SelectItem key={assetId} value={assetId}>
          {name} ({symbol})
        </SelectItem>
      ))}
    </Select>
  )
}
