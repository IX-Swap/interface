import { Box, Typography } from '@mui/material'
import { CHAIN_INFO } from 'config/blockchain/constants'
import { stringTruncate } from 'config/utils'
import { shortenAddress } from 'helpers/blockchain'
import { copyToClipboard } from 'helpers/clipboard'
import React from 'react'
import { useStyles } from './BlockchainWallet.styles'
export interface BlockchainAddressProps {
  account?: string | null
  chainId?: number
  labelName: string
}
export const BlockchainAddress = ({
  account,
  chainId,
  labelName
}: BlockchainAddressProps) => {
  const classes = useStyles()
  const info = CHAIN_INFO[chainId as number]
  return (
    <Box
      className={classes.addressBlock}
      onClick={() => copyToClipboard(account ?? '')}
    >
      <img src={info.logoUrl} alt={'Icon'} className={classes.chainLogo} />
      <Typography variant='subtitle2' fontWeight={600}>
        {labelName.length > 0 ? stringTruncate(labelName, 10) + ' : ' : ''}
        {shortenAddress(account ?? '')}
      </Typography>
    </Box>
  )
}
