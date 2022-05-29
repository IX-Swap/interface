import { Box, TableCell, TableRow, Typography } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/Trading/Orders/OpenOrders/EmptyState.styles'
import { ReactComponent as MoonIcon } from 'assets/icons/moon.svg'
// import { AccountState } from 'app/pages/invest/hooks/useMetamaskWalletState'
import React from 'react'

export const EmptyState = ({ hasItems = false }: { hasItems: boolean }) => {
  //   const { connectCallback, switchChain, accountState, targetChainName } =
  //     useMetamaskConnectionManager()
  const classes = useStyles()
  const title = 'No orders yet'

  return (
    <TableRow>
      <TableCell colSpan={7}>
        <Box className={classes.container}>
          <MoonIcon />
          <Typography variant={'h5'} className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>
            No orders on this wallet, make sure you are connected to the right
            address
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  )
}
