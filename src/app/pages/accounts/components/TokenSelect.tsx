import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
import React from 'react'
import { AssetBalance } from 'types/balance'

export const TokenSelect = React.forwardRef((props: SelectProps, ref) => {
  const { data, isLoading } = useGetCustody()

  if (data === undefined || isLoading) {
    return null
  }

  return (
    <Select {...props} ref={ref}>
      <MenuItem disabled value={undefined}>
        {props.label}
      </MenuItem>
      {data.map((token: AssetBalance) => (
        <MenuItem key={token.symbol} value={token.symbol}>
          {token.name}
        </MenuItem>
      ))}
    </Select>
  )
})
