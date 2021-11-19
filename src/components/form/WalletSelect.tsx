import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'

export enum BlockchainWallet {
  Metamask = 'METAMASK'
}

export const WalletSelect = (props: SelectProps) => {
  return (
    <Select {...props} data-testid='wallet-select'>
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
