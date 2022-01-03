import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { useWalletAddresses } from 'app/pages/accounts/hooks/useWalletAddresses'
import React from 'react'
import { WithdrawalAddress } from 'types/withdrawalAddress'

export const WalletAddressSelect = React.forwardRef(
  (props: SelectProps, ref) => {
    const { data, isLoading } = useWalletAddresses()

    if (data === undefined || isLoading) {
      return null
    }

    return (
      <Select {...props} ref={ref}>
        <MenuItem disabled value={undefined}>
          {props.label}
        </MenuItem>
        {data.map((wallet: WithdrawalAddress) => (
          <MenuItem key={wallet.address} value={wallet.address}>
            {wallet.label}
          </MenuItem>
        ))}
      </Select>
    )
  }
)
