import React, { ReactElement } from 'react'
import { Box, Button, Typography, CircularProgress } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useWeb3React } from '@web3-react/core'
import { injected, coinbase } from 'config/blockchain/connectors'
import { SUPPORTED_WALLETS } from 'config/blockchain/supportedWallets'
import { useServices } from 'hooks/useServices'

interface ConnectWalletButtonProps {
  children: ReactElement
  isLoading?: boolean | undefined
}

const ConnectWalletButton = ({
  children,
  isLoading = false,
  ...rest
}: ConnectWalletButtonProps) => {
  const theme = useTheme()

  return (
    <Button
      fullWidth
      variant='contained'
      disableElevation
      disabled={isLoading}
      sx={{
        backgroundColor: theme.palette.paginationItem.borderHover,
        color: theme.palette.primary.main,
        paddingY: '18px'
      }}
      {...rest}
    >
      <Box display={'flex'} alignItems={'center'} gap={1.5}>
        {children}
        {isLoading && <CircularProgress color='inherit' size={'1rem'} />}
      </Box>
    </Button>
  )
}

export const ConnectWallet = ({ onConnect }: { onConnect: Function }) => {
  const { activate } = useWeb3React()
  const { snackbarService } = useServices()

  const hasMetamaskExtension = window.ethereum?.isMetaMask === true
  const hasCoinbaseExtension = true
  //   const hasCoinbaseExtension =
  //     typeof window.ethereum?.providers?.find(
  //       (provider: any) => provider.isCoinbaseWallet === true
  //     ) !== 'undefined'

  const failedToDetectExtension = () =>
    snackbarService.showSnackbar(
      <>
        Failed to detect wallet extension.
        <br />
        <br />
        Please install the correct wallet extension in your browser.
      </>,
      'error'
    )

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      gap={2}
    >
      <ConnectWalletButton
        onClick={async () => {
          if (hasMetamaskExtension) {
            await activate(injected)
            onConnect()
          } else {
            failedToDetectExtension()
          }
        }}
      >
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <span>Metamask Wallet</span>
          <img
            src={SUPPORTED_WALLETS.METAMASK.iconURL}
            alt={'Metamask'}
            height={'20'}
          />
        </Box>
      </ConnectWalletButton>

      <Typography variant='subtitle2'>or</Typography>

      <ConnectWalletButton
        onClick={async () => {
          if (hasCoinbaseExtension) {
            await activate(coinbase)
            onConnect()
          } else {
            failedToDetectExtension()
          }
        }}
      >
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <span>Coinbase Wallet</span>
          <img
            src={SUPPORTED_WALLETS.COINBASE.iconURL}
            alt={'Coinbase'}
            height={'20'}
          />
        </Box>
      </ConnectWalletButton>
    </Box>
  )
}

export const WalletInfo = ({ wallet }: { wallet: string }) => {
  if (wallet in SUPPORTED_WALLETS) {
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        sx={{
          backgroundColor: '#F7F9FA',
          border: '1px solid #DBE2EC',
          borderRadius: '8px',
          gap: 1,
          marginBottom: '30px'
        }}
      >
        <Typography color={'#778194'} fontSize={14}>
          Connected to
        </Typography>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <Typography
            color={'##343A47'}
            fontSize={20}
            sx={{ textTransform: 'capitalize' }}
            variant='subtitle2'
          >
            {wallet?.toLowerCase()}
          </Typography>
          <img
            src={SUPPORTED_WALLETS[wallet].iconURL}
            alt={'Metamask'}
            height={'20'}
          />
        </Box>
      </Box>
    )
  }

  return <></>
}
