import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { BlockchainSettings } from 'types/blockchain'
import kebabCase from 'lodash/kebabCase'

interface BlockchainInfoProps {
  data: BlockchainSettings['networks']
}

export const BlockchainInfo = ({ data }: BlockchainInfoProps) => {
  const renderWalletInfo = (
    address: string,
    balance: string,
    walletName: string
  ) => [
    <Grid item xs={12} data-testid={`blockchain-info-${kebabCase(walletName)}`}>
      <LabelledValue
        label={`${walletName} Address`}
        value={address}
        labelFontSize={18}
        valueFontSize={18}
        labelWeight='thin'
      />
    </Grid>,
    <Grid item xs={12}>
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
    <>
      {data.map(blockchain => (
        <Grid data-testid='blockchain-info-container' container spacing={2}>
          <Grid item xs={12}>
            <Typography data-testid='blockchain-info-name' variant='h5'>
              {blockchain.name} ({blockchain.symbol})
            </Typography>
          </Grid>
          {blockchain.walletAddress !== undefined &&
            renderWalletInfo(
              blockchain.walletAddress,
              blockchain.balance,
              'Wallet'
            )}
          {blockchain.ownerAddress !== undefined &&
            renderWalletInfo(
              blockchain.ownerAddress,
              blockchain.balance,
              'Owner Wallet'
            )}
          {blockchain.reserveAddress !== undefined &&
            blockchain.reserveBalance !== undefined &&
            renderWalletInfo(
              blockchain.reserveAddress,
              blockchain.reserveBalance,
              'Reserve Wallet'
            )}
        </Grid>
      ))}
    </>
  )
}
