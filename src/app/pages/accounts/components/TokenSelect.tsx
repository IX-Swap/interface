import { MenuItem, Select, SelectProps } from '@mui/material'
import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
import React from 'react'
import { AssetBalance } from 'types/balance'
import { isEmptyString } from 'helpers/strings'

export const TokenSelect = React.forwardRef((props: SelectProps, ref) => {
  const { data, isLoading } = useGetCustody()
  const label = isLoading || data === undefined ? 'No tokens' : props.label

  return (
    <Select {...props} label={label} ref={ref}>
      <MenuItem disabled value={undefined}>
        {label}
      </MenuItem>
      {data?.map((token: AssetBalance) => (
        <MenuItem key={token.symbol} value={token.symbol}>
          {token.symbol} {!isEmptyString(token.name) && `(${token.name})`}
        </MenuItem>
      ))}
    </Select>
  )
})

TokenSelect.defaultProps = {
  label: 'No tokens'
}
