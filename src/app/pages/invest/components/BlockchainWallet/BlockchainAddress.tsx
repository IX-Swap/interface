import { Box, Typography } from '@mui/material'
import { CHAIN_INFO } from 'config/blockchain/constants'
import { shortenAddress } from 'helpers/blockchain'
import React from 'react'
import { useStyles } from './BlockchainWallet.styles'
export interface BlockchainAddressProps {
  account?: string | null
  chainId?: number
}
export const BlockchainAddress = ({
  account,
  chainId
}: BlockchainAddressProps) => {
  const classes = useStyles()
  const info = CHAIN_INFO[chainId as number]
  return (
    <Box className={classes.addressBlock}>
      <img src={info.logoUrl} alt={'Icon'} className={classes.chainLogo} />
      <Typography variant='subtitle2' fontWeight={600}>
        {shortenAddress(account ?? '')}
      </Typography>
    </Box>
  )
}
