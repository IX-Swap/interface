import { Box, TableCell, TableRow, Typography } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/EmptyState.styles'
import { ReactComponent as MoonIcon } from 'assets/icons/moon.svg'
import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import React from 'react'
import { useMetamaskConnectionManager } from 'app/pages/invest/hooks/useMetamaskConnectionManager'

export const EmptyState = ({ hasItems = false }: { hasItems: boolean }) => {
  const { switchChain, accountState, targetChainName, isWhitelisted } =
    useMetamaskConnectionManager()
  const classes = useStyles()
  const getTitle = () => {
    if (accountState === AccountState.DIFFERENT_CHAIN) {
      return 'Wrong network'
    }
    return 'No orders yet'
  }
  const getSubtitle = () => {
    if (accountState === AccountState.NOT_CONNECTED || !isWhitelisted) {
      return 'No orders yet, please connect wallet first'
    }
    if (accountState === AccountState.DIFFERENT_CHAIN) {
      return (
        <>
          Please connect to
          <Box onClick={() => switchChain()} className={classes.connectLink}>
            {targetChainName} network
          </Box>
          to see your open trades
        </>
      )
    }
    return 'No orders on this wallet, make sure you are connected to the right address'
  }
  return (
    <TableRow>
      <TableCell colSpan={7}>
        <Box className={classes.container}>
          <MoonIcon />
          <Typography variant={'h5'} className={classes.title}>
            {getTitle()}
          </Typography>
          <Typography className={classes.subtitle}>{getSubtitle()}</Typography>
        </Box>
      </TableCell>
    </TableRow>
  )
}
