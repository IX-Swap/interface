import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import MetamaskIcon from 'assets/images/metamask_another.png'

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
          style={{ paddingLeft: 56 }}
          disabled={value !== BlockchainWallet.Metamask}
        >
          {label}
          {value === BlockchainWallet.Metamask ? (
            <img
              src={MetamaskIcon}
              alt={label}
              style={{ position: 'absolute', top: 2, left: 16 }}
            />
          ) : null}
        </MenuItem>
      ))}
    </Select>
  )
}
