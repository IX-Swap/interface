import { CSSProperties } from 'react'
import { Box, Typography } from '@material-ui/core'
import UnknownWalletIcon from 'assets/images/unknown-wallet.png'
import UnknownNetworkIcon from 'assets/images/unknown-network.png'
import {
  BlockchainWallet,
  blockchainWalletIcons,
  networkIconMap
} from 'config/blockchain'

interface WAPairProps {
  wallet?: string
  networkCode?: string
}

const labels: Record<string, string> = {
  // wallets
  METAMASK: 'Metamask',
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

  const walletIcon =
    blockchainWalletIcons[wallet as BlockchainWallet] ?? UnknownWalletIcon
  const networkIcon =
    networkIconMap[networkCode as keyof typeof networkIconMap] ??
    UnknownNetworkIcon

  return (
    <Box display='flex' alignItems='center'>
      <Box flex={1} display='flex' alignItems='center'>
        <img style={styles.icon} src={walletIcon} />
        <Typography color='textSecondary'>
          {labels[wallet] ?? 'Other'} Wallet
        </Typography>
      </Box>
      <Box flex={1} display='flex' alignItems='center'>
        <img style={styles.icon} src={networkIcon} />
        <Typography color='textSecondary'>
          {labels[networkCode] ?? 'Other'} Network
        </Typography>
      </Box>
    </Box>
  )
}
