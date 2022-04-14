import { SelectProps } from '@mui/material'
import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
import React from 'react'
import { AssetBalance } from 'types/balance'
import { isEmptyString } from 'helpers/strings'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const TokenSelect = React.forwardRef((props: SelectProps, ref) => {
  const { data, isLoading } = useGetCustody()
  const label = isLoading || data === undefined ? 'No tokens' : props.label

  return (
    <Select {...props} label={label} ref={ref}>
      <SelectItem disabled value={undefined}>
        {label}
      </SelectItem>
      {data?.map((token: AssetBalance) => (
        <SelectItem key={token.symbol} value={token.symbol}>
          {token.symbol} {!isEmptyString(token.name) && `(${token.name})`}
        </SelectItem>
      ))}
    </Select>
  )
})

TokenSelect.defaultProps = {
  label: 'No tokens'
}
