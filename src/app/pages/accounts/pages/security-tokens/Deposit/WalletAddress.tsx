import React from 'react'
import { useFormContext } from 'react-hook-form'
import cn from 'classnames'
import { Box, FormControl, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { SUPPORTED_WALLETS } from 'config/blockchain/supportedWallets'
import { InputLabel } from 'ui/Select/InputLabel/InputLabel'
import { AddWalletAddressButton } from '../../withdrawalAddresses/WithdrawalAddressesList/WithdrawalAddressesList'

export const DEPOSIT_METHODS = [...Object.values(SUPPORTED_WALLETS)]

interface WalletAddressProps {
  networksMatched: boolean
  isWalletRegistered: boolean
}

export const WalletAddress = ({
  networksMatched,
  isWalletRegistered
}: WalletAddressProps) => {
  const { watch } = useFormContext()
  const walletAddress = watch('walletAddress')
  const network = watch('network')

  const theme = useTheme()

  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.palette.secondary.dark,
      border: `1px solid ${theme.palette.menu.border}`,
      borderRadius: '8px',
      padding: '15px',
      gap: 10
    },
    hasError: {
      backgroundColor: theme.palette.error.light,
      borderColor: theme.palette.error.main,
      '& $walletAddress': {
        color: theme.palette.error.main
      },
      '& $network': {
        backgroundColor: '#F5628316',
        color: theme.palette.error.main
      }
    },
    walletAddress: {
      color: theme.palette.tooltip.color,
      flex: 1,
      overflowWrap: 'break-word',
      minWidth: 0
    },
    network: {
      backgroundColor: theme.palette.paginationItem.borderHover,
      borderRadius: '4px',
      color: theme.palette.primary.main,
      padding: '4px 8px'
    },
    errorMessage: {
      color: theme.palette.error.main,
      fontSize: '12px'
    },
    registerWalletAddress: {
      border: `1px solid ${theme.palette.menu.border}`,
      borderRadius: '8px',
      marginTop: '15px',
      padding: '20px',
      textAlign: 'center',
      '& h3': {
        color: theme.palette.table.headerColor,
        fontSize: '16px',
        fontWeight: 600,
        marginTop: 0
      },
      '& p': {
        color: theme.palette.tooltip.color,
        fontSize: '14px'
      },
      '& strong': {
        fontWeight: 600
      }
    }
  }))

  const classes = useStyles()

  return (
    <FormControl>
      <InputLabel>Wallet Address</InputLabel>
      <Box
        className={cn([
          classes.container,
          !networksMatched || !isWalletRegistered ? classes.hasError : ''
        ])}
      >
        <Typography className={classes.walletAddress}>
          {walletAddress}
        </Typography>
        <Typography className={classes.network}>
          {network?.name ?? 'Unsupported Network'}
        </Typography>
      </Box>

      {!networksMatched && (
        <Typography className={classes.errorMessage}>
          <p>
            The selected security token network and the connected wallet network
            do not match.
          </p>

          <p>
            Please try changing your connected wallet or selected security token
            (you may click on <strong>Clear Form</strong> below for your
            convenience).
          </p>
        </Typography>
      )}

      {networksMatched && !isWalletRegistered && (
        <>
          <Typography className={classes.errorMessage}>
            <p>
              The connected wallet address is currently not registered in
              IXPrime.
            </p>

            <p>
              Please try registering it (you may click on{' '}
              <strong>+ Add Wallet Address</strong>
              below) or connecting a different wallet (you may click on{' '}
              <strong>Clear Form</strong> below for your convenience).
            </p>
          </Typography>
          <Box className={classes.registerWalletAddress}>
            <h3>Register Wallet Address</h3>
            <p>
              To register your wallet address in IXPrime, you must add it to the{' '}
              <strong>My Wallet Addresses</strong> page and wait for the admin
              to whitelist it.
            </p>
            <AddWalletAddressButton fullWidth />
          </Box>
        </>
      )}
    </FormControl>
  )
}
