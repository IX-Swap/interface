import { MenuItem, Select, SelectProps } from '@material-ui/core'
import React from 'react'

export enum BlockchainWallet {
  Metamask = 'Metamask',
  Hedera = 'Hedera Wallet',
  Tezos = 'Tezos Wallet'
}

export const WalletSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Select Wallet
      </MenuItem>
      {Object.entries(BlockchainWallet).map(([label, value]) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
