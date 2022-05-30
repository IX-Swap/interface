import { Box } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/EmptyState.styles'
import { useMetamaskConnectionManager } from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import React, { useMemo } from 'react'
import { EmptyState } from 'app/pages/invest/components/Trading/Orders/EmptyState'

const getTitle = (accountState: AccountState) => {
  if (accountState === AccountState.DIFFERENT_CHAIN) {
    return 'Wrong network'
  }
  return 'No orders yet'
}

export const OpenOrdersEmptyState = () => {
  const { switchChain, accountState, targetChainName, isWhitelisted } =
    useMetamaskConnectionManager()
  const classes = useStyles()
  const subtitle = useMemo(() => {
    if (accountState === AccountState.NOT_CONNECTED || !isWhitelisted) {
      return 'No orders yet, please connect wallet first'
    }
    if (accountState === AccountState.DIFFERENT_CHAIN) {
      return (
        <>
          Please connect to
          <Box onClick={switchChain} className={classes.connectLink}>
            {targetChainName} network
          </Box>
          to see your open trades
        </>
      )
    }
    return 'No orders on this wallet, make sure you are connected to the right address'
  }, [accountState, isWhitelisted, targetChainName, switchChain, classes])

  return <EmptyState title={getTitle(accountState)} subtitle={subtitle} />
}
