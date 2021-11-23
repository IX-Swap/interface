import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { BlockchainWalletView } from 'app/components/BlockchainWalletView'
import { BlockchainWallet } from 'config/blockchain'

export const WalletSelect = (props: SelectProps) => {
  return (
    <Select {...props} data-testid='wallet-select'>
      <MenuItem disabled value={undefined}>
        Select Wallet
      </MenuItem>
      {Object.entries(BlockchainWallet).map(([label, value]) => {
        return (
          <MenuItem
            key={value}
            value={value}
            disabled={value !== BlockchainWallet.Metamask}
          >
            <BlockchainWalletView wallet={value} />
          </MenuItem>
        )
      })}
    </Select>
  )
}
