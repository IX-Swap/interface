import { MenuItem, Select, SelectProps } from '@material-ui/core'
import React from 'react'

export enum BlockchainWallet {
  Metamask = 'METAMASK'
}

export const WalletSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Select Wallet
      </MenuItem>
      {Object.entries(BlockchainWallet).map(([label, value]) => (
        <MenuItem
          key={value}
          value={value}
          disabled={value !== BlockchainWallet.Metamask}
        >
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
