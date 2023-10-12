import CloseIcon from '@mui/icons-material/Close'
import { Box, DialogTitle, Typography } from '@mui/material'
import { UnsupportedChainIdError } from '@web3-react/core'
import React from 'react'
import useStyles from 'components/WalletModal/WalletModal.styles'

export const ErrorSection = ({
  error,
  toggleWalletModal
}: {
  error: any
  toggleWalletModal: () => void
}) => {
  const classes = useStyles()

  return (
    <Box>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
        {/* <IconButton aria-label='close' size='large'> */}
        <CloseIcon onClick={toggleWalletModal} />
        {/* </IconButton> */}
      </Box>
      <Box>
        {error instanceof UnsupportedChainIdError ? (
          <>Wrong Network</>
        ) : (
          <>
            <DialogTitle className={classes.title}>
              Error connecting
            </DialogTitle>
            <Typography textAlign={'center'}>
              Try refreshing the page.
            </Typography>
          </>
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
        {/* {!(error instanceof UnsupportedChainIdError) &&
          error?.code &&
          error?.code !== -32002 && (
            <>Error connecting. Try refreshing the page.</>
          )} */}
      </Box>
    </Box>
  )
}
