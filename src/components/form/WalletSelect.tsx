import React from 'react'
import { SelectProps } from '@mui/material'
import { BlockchainWalletView } from 'app/components/BlockchainWalletView'
import { BlockchainWallet } from 'config/blockchain'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const WalletSelect = (props: SelectProps) => {
  return (
    <Select {...props} data-testid='wallet-select'>
      <SelectItem disabled value={undefined}>
        Select Wallet
      </SelectItem>
      {Object.entries(BlockchainWallet).map(([label, value]) => {
        return (
          <SelectItem
            key={value}
            value={value}
            disabled={value !== BlockchainWallet.Metamask}
          >
            <BlockchainWalletView wallet={value} />
          </SelectItem>
        )
      })}
    </Select>
  )
}
WalletSelect.displayName = 'Select_WalletSelect'
