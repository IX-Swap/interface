import React from 'react'
import { shortenAddress } from 'helpers/blockchain'
import { Grid, Typography, Box } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/BlockchainWallet/BlockchainWallet.styles'
import { useActiveWeb3React } from 'hooks/blockchain/web3'

export const BlockchainWallet = () => {
  const classes = useStyles()
  const { account } = useActiveWeb3React()
  return (
    <Grid>
      <Typography className={classes.label} variant='subtitle1'>
        Your Wallet:
      </Typography>
      <Box>{shortenAddress(account ?? '')}</Box>
    </Grid>
  )
}
