import { SelectProps } from '@mui/material'
import { useWalletAddresses } from 'app/pages/accounts/hooks/useWalletAddresses'
import React from 'react'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const WalletAddressSelect = React.forwardRef(
  (props: SelectProps, ref) => {
    const { data, isLoading } = useWalletAddresses()

    if (data === undefined || isLoading) {
      return null
    }

    return (
      <>
        <InputLabel>{props.label}</InputLabel>
        <Select
          {...props}
          ref={ref}
          label={undefined}
          placeholder={String(props.label)}
          displayEmpty
        >
          <SelectItem disabled value={undefined}>
            {props.label}
          </SelectItem>
          {data.map((wallet: WithdrawalAddress) => (
            <SelectItem key={wallet.address} value={wallet.address}>
              {wallet.label}
            </SelectItem>
          ))}
        </Select>
      </>
    )
  }
)
WalletAddressSelect.displayName = 'Select_ WalletAddressSelect'
