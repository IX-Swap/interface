import { SelectProps } from '@mui/material'
import { useWalletAddresses } from 'app/pages/accounts/hooks/useWalletAddresses'
import React from 'react'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const WalletAddressSelect = React.forwardRef(
  (props: SelectProps, ref) => {
    const { data, isLoading } = useWalletAddresses()

    if (data === undefined || isLoading) {
      return null
    }

    return (
      <Select {...props} ref={ref}>
        <SelectItem disabled value={undefined}>
          {props.label}
        </SelectItem>
        {data.map((wallet: WithdrawalAddress) => (
          <SelectItem key={wallet.address} value={wallet.address}>
            {wallet.label}
          </SelectItem>
        ))}
      </Select>
    )
  }
)
