import React from 'react'
import { Box } from '@mui/material'
import { BlockchainWallet, blockchainWalletIcons } from 'config/blockchain'

interface BlockchainWalletViewProps {
  wallet: BlockchainWallet
}

export const BlockchainWalletView = ({ wallet }: BlockchainWalletViewProps) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [label] = Object.entries(BlockchainWallet).find(
    ([_, value]) => value === wallet
  )!

  return (
    <Box display={'flex'} alignItems={'center'}>
      <img src={blockchainWalletIcons[wallet]} alt={label} width={40} />
      <Box component={'span'} marginLeft={2}>
        {label}
      </Box>
    </Box>
  )
}
