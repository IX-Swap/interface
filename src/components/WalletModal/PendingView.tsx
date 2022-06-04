import { Box, DialogTitle, Typography } from '@mui/material'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { injected } from 'config/blockchain/connectors'
import { SUPPORTED_WALLETS } from 'config/blockchain/supportedWallets'
import React from 'react'
import Option from './Option'
import useStyles from 'components/WalletModal/WalletModal.styles'

export default function PendingView({
  connector,
  error = false,
  setPendingError,
  tryActivation
}: {
  connector?: AbstractConnector
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}) {
  const isMetamask = Boolean(window?.ethereum?.isMetaMask)
  const classes = useStyles()
  console.log({ connector, error })
  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'no-wrap'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderRadius: '12px',
          marginBottom: '20px'
        }}
      >
        <Box
          sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}
        >
          {error ? (
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                display: 'flex',
                flexWrap: 'no-wrap'
              }}
            >
              <DialogTitle className={classes.title}>
                Error connecting
              </DialogTitle>
              <Box
                sx={{
                  borderRadius: '8px',
                  fontSize: '12px',
                  marginLeft: '1rem',
                  padding: '0.5rem',
                  fontWeight: 600,
                  userSelect: 'none'
                }}
                onClick={() => {
                  setPendingError(false)
                  connector !== undefined && tryActivation(connector)
                }}
              >
                Try Again
              </Box>
            </Box>
          ) : (
            <Typography>Initializing...</Typography>
          )}
        </Box>
      </Box>
      {Object.keys(SUPPORTED_WALLETS).map(key => {
        const option = SUPPORTED_WALLETS[key]
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <Option
              id={`connect-${key}`}
              key={key}
              clickable={false}
              header={option.name}
              subheader={option.description}
              icon={option.iconURL}
            />
          )
        }
        return null
      })}
    </Box>
  )
}
