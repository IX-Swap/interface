import React, { CSSProperties } from 'react'
import { Box, Typography } from '@material-ui/core'
import UnknownWalletIcon from 'assets/images/unknown-wallet.png'
import UnknownNetworkIcon from 'assets/images/unknown-network.png'
import {
  BlockchainWallet,
  blockchainWalletIcons,
  networkIconMap
} from 'config/blockchain'

interface WAPairProps {
  wallet?: BlockchainWallet
  networkCode?: string
}

const walletLabels: Record<BlockchainWallet, string> = {
  // wallets
  METAMASK: 'Metamask',
  TEMPLE: 'Temple',
  MYALGO: 'My Algo',
  HBAR: 'Hbar'
}

const blockchainLabels: Record<string, string> = {
  // networks
  ETH: 'Ethereum',
  XTZ: 'Tezos',
  ALGO: 'Algorand',
  HBAR: 'Hedera'
}

const styles: Record<string, CSSProperties> = {
  icon: {
    width: 'auto',
    height: 50,
    marginRight: 14
  }
}

export const WAPair = ({ wallet, networkCode }: WAPairProps) => {
  if (wallet === undefined || networkCode === undefined) return null

  const walletIcon = blockchainWalletIcons[wallet] ?? UnknownWalletIcon
  const networkIcon =
    networkIconMap[networkCode as keyof typeof networkIconMap] ??
    UnknownNetworkIcon

  return (
    <Box display='flex' alignItems='center'>
      <Box flex={1} display='flex' alignItems='center'>
        <img style={styles.icon} src={walletIcon} />
        <Typography color='textSecondary'>
          {walletLabels[wallet] ?? 'Other'} Wallet
        </Typography>
      </Box>
      <Box flex={1} display='flex' alignItems='center'>
        <img style={styles.icon} src={networkIcon} />
        <Typography color='textSecondary'>
          {blockchainLabels[networkCode] ?? 'Other'} Blockchain
        </Typography>
      </Box>
    </Box>
  )
}
