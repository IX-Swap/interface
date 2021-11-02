import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { BlockchainNetwork } from 'types/blockchain'
import kebabCase from 'lodash/kebabCase'

interface BlockchainInfoProps {
  network: BlockchainNetwork
}

export const BlockchainInfo = ({ network }: BlockchainInfoProps) => {
  const renderWalletInfo = (
    address: string,
    balance: string,
    walletName: string
  ) => [
    <Grid
      item
      xs={12}
      data-testid={`blockchain-info-${kebabCase(walletName)}-address`}
    >
      <LabelledValue
        label={`${walletName} Address`}
        value={address}
        labelFontSize={18}
        valueFontSize={18}
        labelWeight='thin'
      />
    </Grid>,
    <Grid
      item
      xs={12}
      data-testid={`blockchain-info-${kebabCase(walletName)}-balance`}
    >
      <LabelledValue
        label={`${walletName} Balance`}
        value={balance}
        labelFontSize={18}
        valueFontSize={18}
        labelWeight='thin'
      />
    </Grid>
  ]

  return (
    <Grid data-testid='network.info-container' container spacing={2}>
      <Grid item xs={12}>
        <Typography data-testid='blockchain-network-info-name' variant='h5'>
          {network.name} ({network.symbol})
        </Typography>
      </Grid>
      {network.walletAddress !== undefined &&
        renderWalletInfo(network.walletAddress, network.balance, 'Wallet')}
      {network.ownerAddress !== undefined &&
        renderWalletInfo(network.ownerAddress, network.balance, 'Owner Wallet')}
      {network.reserveAddress !== undefined &&
        network.reserveBalance !== undefined &&
        renderWalletInfo(
          network.reserveAddress,
          network.reserveBalance,
          'Reserve Wallet'
        )}
    </Grid>
  )
}
