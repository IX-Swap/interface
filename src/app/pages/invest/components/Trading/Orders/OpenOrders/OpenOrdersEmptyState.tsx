import { Box } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/EmptyState.styles'
import { useMetamaskConnectionManager } from 'app/pages/invest/hooks/useMetamaskConnectionManager'
import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import React, { useMemo } from 'react'
import { EmptyState } from 'app/pages/invest/components/Trading/Orders/EmptyState'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

const getTitle = (accountState: AccountState) => {
  if (accountState === AccountState.DIFFERENT_CHAIN) {
    return 'Wrong network'
  }
  return 'No orders'
}

export const OpenOrdersEmptyState = () => {
  const { switchChain, accountState, targetChainName, isWhitelisted } =
    useMetamaskConnectionManager()
  const { found } = isWhitelisted
  const classes = useStyles()
  const { isTablet } = useAppBreakpoints()
  const subtitle = useMemo(() => {
    if (accountState === AccountState.NOT_CONNECTED || !found) {
      return 'No orders yet, please connect wallet first'
    }
    if (accountState === AccountState.DIFFERENT_CHAIN) {
      return (
        <>
          Please connect to
          {isTablet ? (
            <> {targetChainName} network </>
          ) : (
            <Box onClick={switchChain} className={classes.connectLink}>
              {targetChainName} network
            </Box>
          )}
          {isTablet && <> in your Metamask app </>}
          to see your open trades
        </>
      )
    }
    return 'No orders on this wallet, make sure you are connected to the right address'
  }, [accountState, found, targetChainName, switchChain, classes, isTablet])

  return <EmptyState title={getTitle(accountState)} subtitle={subtitle} />
}
