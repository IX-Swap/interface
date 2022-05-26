import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton } from '@mui/material'
import { UnsupportedChainIdError } from '@web3-react/core'
import React from 'react'

export const ErrorSection = ({
  error,
  toggleWalletModal
}: {
  error: any
  toggleWalletModal: () => void
}) => {
  return (
    <Box>
      <IconButton aria-label='close' onClick={toggleWalletModal} size='large'>
        <CloseIcon />
      </IconButton>
      <Box>
        {error instanceof UnsupportedChainIdError ? (
          <>Wrong Network</>
        ) : (
          <>Error connecting</>
        )}
      </Box>
      <Box>
        {error instanceof UnsupportedChainIdError && (
          <h5>Please connect to the appropriate Ethereum network.</h5>
        )}
        {(error?.code ?? false) !== false && error?.code === -32002 && (
          <h5>
            <>
              You already have a connection in progress. Please check your
              wallet extension/app{' '}
            </>
          </h5>
        )}
        {!(error instanceof UnsupportedChainIdError) &&
          error?.code &&
          error?.code !== -32002 && (
            <>Error connecting. Try refreshing the page.</>
          )}
      </Box>
    </Box>
  )
}
