import { SelectProps } from '@mui/material'
import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
import React from 'react'
import { AssetBalance } from 'types/balance'
import { isEmptyString } from 'helpers/strings'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'

export const TokenSelect = React.forwardRef((props: SelectProps, ref) => {
  const { data, isLoading } = useGetCustody()
  const label = isLoading || data === undefined ? 'No tokens' : props.label

  return (
    <>
      <InputLabel>{props.label}</InputLabel>
      <Select
        {...props}
        ref={ref}
        placeholder={String(props.label)}
        label={undefined}
        displayEmpty
      >
        <SelectItem disabled value={undefined}>
          {label}
        </SelectItem>
        <SelectItem disabled value={undefined}>
          {label}
        </SelectItem>
        {data?.map((token: AssetBalance) => (
          <SelectItem key={token.symbol} value={token.symbol}>
            {token.symbol} {!isEmptyString(token.name) && `(${token.name})`}
          </SelectItem>
        ))}
      </Select>
    </>
  )
})

TokenSelect.defaultProps = {
  label: 'No tokens'
}

TokenSelect.displayName = 'Select_TokenSelect'
