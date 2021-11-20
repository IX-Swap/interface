import React from 'react'
import { Box, MenuItem, Select, SelectProps } from '@material-ui/core'
import MetamaskIcon from 'assets/images/metamask_another.png'

export enum BlockchainWallet {
  Metamask = 'METAMASK'
}

const blockchainWalletIcons = { [BlockchainWallet.Metamask]: MetamaskIcon }

export const WalletSelect = (props: SelectProps) => {
  return (
    <Select {...props} data-testid='wallet-select'>
      <MenuItem disabled value={undefined}>
        Select Wallet
      </MenuItem>
      {Object.entries(BlockchainWallet).map(([label, value]) => {
        const icon = blockchainWalletIcons[value]
        const hasIcon = icon !== undefined
        return (
          <MenuItem
            key={value}
            value={value}
            disabled={value !== BlockchainWallet.Metamask}
          >
            <Box display={'flex'} alignItems={'center'}>
              {hasIcon ? <img src={icon} alt={label} /> : null}
              <Box component={'span'} marginLeft={2}>
                {label}
              </Box>
            </Box>
          </MenuItem>
        )
      })}
    </Select>
  )
}
