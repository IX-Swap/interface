import { Box, Button, Hidden, Typography } from '@mui/material'
import { useWithdrawalAddressAdded } from 'app/pages/accounts/pages/withdrawalAddresses/hooks/useWithdrawalAddressAdded'
import { WithdrawalAddressesRoute } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { useStyles } from 'app/pages/invest/components/BlockchainWallet/BlockchainWallet.styles'
import { WalletModalContext } from 'components/WalletModal/WalletModalContextWrapper'
import { isEmptyString } from 'helpers/strings'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BlockchainAddress } from './BlockchainAddress'
export const BlockchainWallet = () => {
  const classes = useStyles()
  const { account, chainId } = useActiveWeb3React()
  const context = useContext(WalletModalContext)
  const isAddressWhitelisted = useWithdrawalAddressAdded(account)

  return (
    <>
      <>
        {isEmptyString(account) ? (
          <Button
            variant='contained'
            color='primary'
            onClick={context?.toggleModal}
          >
            Connect Wallet
          </Button>
        ) : (
          <>
            {!isAddressWhitelisted && (
              <Button
                variant='contained'
                color='primary'
                component={Link}
                to={WithdrawalAddressesRoute.create}
              >
                Add Wallet
              </Button>
            )}
            {isAddressWhitelisted && (
              <Box display='flex' gap={1}>
                <Hidden lgDown>
                  <Typography className={classes.label} variant='subtitle1'>
                    Your Wallet:
                  </Typography>
                </Hidden>
                <BlockchainAddress chainId={chainId} account={account} />
              </Box>
            )}
          </>
        )}
      </>
    </>
  )
}
